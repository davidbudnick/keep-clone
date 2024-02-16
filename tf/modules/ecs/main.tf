data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "alb_security_group" {
  name   = "keep-alb-security-group-${var.environment}"
  vpc_id = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "load_balancer" {
  name               = "keep-load-balancer-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_security_group.id]
  subnets            = data.aws_subnets.default.ids
}

resource "aws_lb_target_group" "target_group_ui" {
  name        = "target-group-ui-${var.environment}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }
}

resource "aws_lb_listener" "load_balancer_listener_ui" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group_ui.arn
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action = "sts:AssumeRole",
      },
    ],
  })
}

resource "aws_iam_role_policy" "ecs_task_execution_role_policy" {
  name = "ecs-task-execution-role-policy"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*",
        Effect   = "Allow",
      },
    ],
  })
}

resource "aws_iam_role" "ecs_task_role" {
  name = "ecs-task-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action = "sts:AssumeRole",
      },
    ],
  })
}


resource "aws_ecs_task_definition" "keep_ui_task_definition" {
  family                   = "keep-ui-task-${var.environment}"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name      = "keep-ui-${var.environment}"
      image     = var.keep_ui_image_name
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "github_actions_environment_secret" "family_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_FAMILY_NAME_UI"
  plaintext_value = aws_ecs_task_definition.keep_ui_task_definition.family
}

resource "github_actions_environment_secret" "container_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CONTAINER_NAME_UI"
  plaintext_value = "keep-ui-${var.environment}"
}

resource "aws_ecs_cluster" "keep_cluster" {
  name = "keep-cluster-${var.environment}"
}

resource "github_actions_environment_secret" "cluster_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CLUSTER_NAME"
  plaintext_value = aws_ecs_cluster.keep_cluster.name
}

resource "aws_ecs_service" "keep_ui_service" {
  name            = "keep-ui-service-${var.environment}"
  task_definition = aws_ecs_task_definition.keep_ui_task_definition.arn
  cluster         = aws_ecs_cluster.keep_cluster.id
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
    security_groups  = [aws_security_group.alb_security_group.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group_ui.arn
    container_name   = "keep-ui-${var.environment}"
    container_port   = 80
  }

  depends_on = [
    aws_iam_role_policy.ecs_task_execution_role_policy,
    aws_lb.load_balancer,
  ]
}

resource "github_actions_environment_secret" "keep_ui_ecs_service_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_SERVICE_NAME_UI"
  plaintext_value = aws_ecs_service.keep_ui_service.name
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "keep_ui_alb_sg" {
  name        = "keep-ui-alb-sg-staging"
  description = "ALB security group for keep-ui in staging"
  vpc_id      = data.aws_vpc.default.id

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

resource "aws_lb" "keep_ui_alb_staging" {
  name               = "keep-ui-alb-staging"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.keep_ui_alb_sg.id]
  subnets            = data.aws_subnets.default.ids
}

resource "aws_lb_target_group" "keep_ui_tg_staging" {
  name        = "keep-ui-tg-staging"
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

resource "aws_lb_listener" "keep_ui_listener_staging" {
  load_balancer_arn = aws_lb.keep_ui_alb_staging.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.keep_ui_tg_staging.arn
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
        Action = "sts:AssumeRole",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Effect = "Allow",
      },
    ],
  })
}

resource "aws_ecs_task_definition" "keep_ui_task_staging" {
  family                   = "keep-ui-task-staging"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name      = "keep_ui_staging"
      image     = var.keep_ui_ecr_image_name
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

locals {
  repository_name = "keep-clone"
  environment     = "staging"
}

resource "github_actions_environment_secret" "keep_ui_ecs_family_name_staging" {
  repository      = local.repository_name
  environment     = "staging"
  secret_name     = "ECS_FAMILY_NAME_UI"
  plaintext_value = aws_ecs_task_definition.keep_ui_task_staging.family
}

resource "github_actions_environment_secret" "keep_ui_ecs_container_name_staging" {
  repository      = local.repository_name
  environment     = "staging"
  secret_name     = "ECS_CONTAINER_NAME_UI"
  plaintext_value = "keep_ui_staging"
}

resource "aws_ecs_cluster" "keep_cluster_staging" {
  name = "keep-cluster-staging"
}

resource "github_actions_environment_secret" "keep_ui_ecs_cluster_name_staging" {
  repository      = local.repository_name
  environment     = "staging"
  secret_name     = "ECS_CLUSTER_NAME_UI"
  plaintext_value = aws_ecs_cluster.keep_cluster_staging.name
}

data "aws_ecs_task_definition" "keep_ui_task_staging" {
  task_definition = aws_ecs_task_definition.keep_ui_task_staging.family
  depends_on      = [aws_ecs_task_definition.keep_ui_task_staging]
}

resource "aws_ecs_service" "keep_ui_service_staging" {
  name            = "keep-ui-service-staging"
  task_definition = data.aws_ecs_task_definition.keep_ui_task_staging.arn
  cluster         = aws_ecs_cluster.keep_cluster_staging.id
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
    security_groups  = [aws_security_group.keep_ui_alb_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.keep_ui_tg_staging.arn
    container_name   = "keep_ui_staging"
    container_port   = 80
  }

  depends_on = [
    aws_iam_role_policy.ecs_task_execution_role_policy,
    aws_lb.keep_ui_alb_staging,
  ]
}

resource "github_actions_environment_secret" "keep_ui_ecs_service_name_staging" {
  repository      = local.repository_name
  environment     = "staging"
  secret_name     = "ECS_SERVICE_NAME_UI"
  plaintext_value = aws_ecs_service.keep_ui_service_staging.name
}

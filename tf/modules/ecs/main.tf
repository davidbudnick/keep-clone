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
      ],
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/"
          awslogs-region        = var.region
          awslogs-stream-prefix = "ecs"
          awslogs-create-group  = "true"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "keep_server_task_definition" {
  family                   = "keep-server-task-${var.environment}"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name      = "keep-server-${var.environment}"
      image     = var.keep_server_image_name
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80,
          protocol      = "tcp"
        }
      ],
      environmentFiles = [{
        value = "${var.bucket_arn}/.env",
        type  = "s3"
      }]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/"
          awslogs-region        = var.region
          awslogs-stream-prefix = "ecs"
          awslogs-create-group  = "true"
        }
      }
    }
  ])
}

resource "aws_ecs_cluster" "keep_cluster" {
  name = "keep-cluster-${var.environment}"
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

  lifecycle {
    ignore_changes = [
      task_definition,
    ]
  }

  depends_on = [
    aws_iam_role_policy.ecs_task_execution_role_policy,
    aws_lb.load_balancer,
  ]
}

resource "aws_ecs_service" "keep_server_service" {
  name            = "keep-server-service-${var.environment}"
  task_definition = aws_ecs_task_definition.keep_server_task_definition.arn
  cluster         = aws_ecs_cluster.keep_cluster.id
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
    security_groups  = [aws_security_group.alb_security_group.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group_server.arn
    container_name   = "keep-server-${var.environment}"
    container_port   = 80
  }

  lifecycle {
    ignore_changes = [
      task_definition,
    ]
  }

  depends_on = [
    aws_iam_role_policy.ecs_task_execution_role_policy,
    aws_lb.load_balancer,
  ]
}

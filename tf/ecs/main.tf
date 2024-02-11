data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_lb_listener" "keep_ui_listener_staging" {
  load_balancer_arn = var.keep_ui_alb_staging_arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = var.keep_ui_tg_staging_arn
  }
}

resource "aws_ecs_task_definition" "keep_ui_task_staging" {
  family                   = "keep-ui-task-staging"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = var.ecs_task_execution_role_arn
  task_role_arn            = var.ecs_task_role_arn

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

resource "aws_ecs_cluster" "keep_cluster_staging" {
  name = "keep-cluster-staging"
}

resource "aws_ecs_service" "keep_ui_service_staging" {
  name            = "keep-ui-service-staging"
  task_definition = aws_ecs_task_definition.keep_ui_task_staging.arn
  cluster         = aws_ecs_cluster.keep_cluster_staging.id
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
    security_groups  = [var.keep_ui_alb_sg_id]
  }

  load_balancer {
    target_group_arn = var.keep_ui_tg_staging_arn
    container_name   = "keep_ui_staging"
    container_port   = 80
  }

  depends_on = [
    aws_lb_listener.keep_ui_listener_staging
  ]
}

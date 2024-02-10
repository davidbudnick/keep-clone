provider "aws" {
  region = "us-east-1"
}

module "ecr" {
  source = "../ecr"
}

resource "aws_iam_policy" "allow_push_pull_policy_keep" {
  name        = "AllowPushPullPolicyKeep"
  path        = "/"
  description = "Policy that allows read and write access to specific ECR repositories"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:DescribeRepositories",
          "ecr:GetRepositoryPolicy",
          "ecr:ListImages",
          "ecr:DeleteRepository",
          "ecr:DeleteRepositoryPolicy",
          "ecr:SetRepositoryPolicy",
          "ecr:DeleteImage",
          "ecr:ListTagsForResource",
          "ecr:TagResource",
          "ecr:UntagResource",
        ],
        Resource = [
          module.ecr.keep_ui_ecr_arn,
          module.ecr.keep_server_ecr_arn
        ]
      }
    ]
  })
}

resource "aws_iam_group" "keep_users" {
  name = "KeepUsersGroup"
}

resource "aws_iam_group_policy_attachment" "keep_users_policy_attachment" {
  group      = aws_iam_group.keep_users.name
  policy_arn = aws_iam_policy.allow_push_pull_policy_keep.arn
}

resource "aws_iam_user" "keep_user_github" {
  name = "KeepUserGithub"
}

resource "aws_iam_group_membership" "keep_user_github_membership" {
  name = "keep-user-github-membership"

  users = [
    aws_iam_user.keep_user_github.name,
  ]

  group = aws_iam_group.keep_users.name
}

resource "aws_iam_access_key" "keep_user_github_access_key" {
  user = aws_iam_user.keep_user_github.name
}

output "access_key_id" {
  value     = aws_iam_access_key.keep_user_github_access_key.id
  sensitive = true
}

output "secret_access_key" {
  value     = aws_iam_access_key.keep_user_github_access_key.secret
  sensitive = true
}

resource "aws_s3_bucket" "keep_secrets-staging" {
  bucket = "keep-secrets-staging"
}

resource "aws_ecs_cluster" "keep_cluster_staging" {
  name = "keep-cluster-staging"
}

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
        Action = "sts:AssumeRole",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Effect = "Allow",
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
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
      image     = module.ecr.keep_ui_ecr_image_name
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

resource "aws_ecs_service" "keep_ui_service_staging" {
  name            = "keep-ui-service-staging"
  cluster         = aws_ecs_cluster.keep_cluster_staging.id
  task_definition = aws_ecs_task_definition.keep_ui_task_staging.arn
  launch_type     = "FARGATE"
  desired_count   = 1

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
    aws_lb_listener.keep_ui_listener_staging
  ]
}

output "alb_dns_name" {
  value = aws_lb.keep_ui_alb_staging.dns_name
}

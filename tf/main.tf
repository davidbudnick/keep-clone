provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket  = "keep-tf"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

resource "aws_ecr_repository" "keep_ui" {
  name                 = "keep_ui"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "aws_ecr_repository" "keep_server" {
  name                 = "keep_server"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
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
          aws_ecr_repository.keep_ui.arn,
          aws_ecr_repository.keep_server.arn
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

# Ensure .env (UI) and config.yml (Server) are placed in the bucket
resource "aws_s3_bucket" "keep_secrets-staging" {
  bucket = "keep-secrets-staging"
}

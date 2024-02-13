resource "aws_iam_group" "keep_users_group" {
  name = "KeepUsersGroup"
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
          var.keep_ui_ecr_arn,
          var.keep_server_ecr_arn
        ]
      }
    ]
  })
}

resource "aws_iam_group_policy_attachment" "keep_users_policy_attachment" {
  group      = aws_iam_group.keep_users_group.name
  policy_arn = aws_iam_policy.allow_push_pull_policy_keep.arn
}

resource "aws_iam_policy" "allow_update_and_deploy_keep" {
  name        = "AllowUpdateAndDeployKeep"
  path        = "/"
  description = "Policy that allows updating ECS task definitions and deploying updates to ECS services, with specific permissions for ECR and the ability to pass IAM roles to ECS."

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:GetAuthorizationToken",
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
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
        Resource = "*",
      },
      {
        Effect : "Allow",
        Action : [
          "ecs:RegisterTaskDefinition",
          "ecs:DeregisterTaskDefinition",
          "ecs:UpdateService",
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:DescribeTasks",
          "ecs:ListTasks",
          "ecs:StartTask",
          "ecs:StopTask",
          "ecs:ListClusters",
          "iam:PassRole",
        ],
        Resource : "*"
      }
    ]
  })
}

resource "aws_iam_group_policy_attachment" "keep_users_policy_attachment_2" {
  group      = aws_iam_group.keep_users_group.name
  policy_arn = aws_iam_policy.allow_update_and_deploy_keep.arn
}

resource "aws_iam_user" "keep_user_github" {
  name = "KeepUserGithub"
}

resource "aws_iam_group_membership" "keep_user_github_membership" {
  name = "keep-user-github-membership"
  users = [
    aws_iam_user.keep_user_github.name,
  ]

  group = aws_iam_group.keep_users_group.name
}

resource "aws_iam_access_key" "keep_user_github_access_key" {
  user = aws_iam_user.keep_user_github.name
}

locals {
  repository_name = "keep-clone"
}

resource "github_actions_secret" "aws_access_key_id" {
  repository      = local.repository_name
  secret_name     = "AWS_ACCESS_KEY_ID"
  plaintext_value = aws_iam_access_key.keep_user_github_access_key.id
}

resource "github_actions_secret" "aws_secret_access_key" {
  repository      = local.repository_name
  secret_name     = "AWS_SECRET_ACCESS_KEY"
  plaintext_value = aws_iam_access_key.keep_user_github_access_key.secret
}

resource "github_actions_secret" "aws_region" {
  repository      = local.repository_name
  secret_name     = "AWS_REGION"
  plaintext_value = "us-east-1"
}

resource "github_actions_environment_secret" "staging_ui_env_file_content" {
  repository      = local.repository_name
  environment     = "build"
  secret_name     = "UI_ENV"
  plaintext_value = file("./env/staging.ui.env")
}

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

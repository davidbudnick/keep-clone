resource "github_actions_environment_secret" "aws_access_key_id" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "AWS_ACCESS_KEY_ID"
  plaintext_value = aws_iam_access_key.keep_user_github_access_key.id
}

resource "github_actions_environment_secret" "aws_secret_access_key" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "AWS_SECRET_ACCESS_KEY"
  plaintext_value = aws_iam_access_key.keep_user_github_access_key.secret
}

resource "github_actions_environment_secret" "aws_region" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "AWS_REGION"
  plaintext_value = "us-east-1"
}

resource "github_actions_environment_secret" "ui_env_file_content" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "UI_ENV"
  plaintext_value = file("./env/ui.env")
}

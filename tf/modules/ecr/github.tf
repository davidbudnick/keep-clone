resource "github_actions_environment_secret" "keep_ui_repository_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECR_REPO_NAME_UI"
  plaintext_value = aws_ecr_repository.keep_ui_repository.name
}

resource "github_actions_environment_secret" "keep_server_repository_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECR_REPO_NAME_SERVER"
  plaintext_value = aws_ecr_repository.keep_server_repository.name
}

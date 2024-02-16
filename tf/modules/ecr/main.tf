resource "aws_ecr_repository" "keep_ui_repository" {
  name                 = "keep-ui-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "github_actions_environment_secret" "keep_ui_repository_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECR_REPO_NAME_UI"
  plaintext_value = aws_ecr_repository.keep_ui_repository.name
}

resource "aws_ecr_repository" "keep_server_repository" {
  name                 = "keep-server-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "github_actions_environment_secret" "keep_server_repository_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECR_REPO_NAME_SERVER"
  plaintext_value = aws_ecr_repository.keep_server_repository.name
}

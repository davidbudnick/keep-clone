resource "aws_ecr_repository" "keep_ui_staging" {
  name                 = "keep_ui_staging"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "github_actions_environment_secret" "aws_access_key_id" {
  repository      = local.repository_name
  environment     = "build"
  secret_name     = "AWS_ECR_UI_REPO"
  plaintext_value = aws_ecr_repository.keep_ui_staging.name
}

resource "github_actions_environment_secret" "keep_ui_ecr_image_name_staging" {
  repository      = local.repository_name
  environment     = "staging"
  secret_name     = "ECS_IMAGE_NAME_UI"
  plaintext_value = "${aws_ecr_repository.keep_ui_staging.repository_url}:latest"
}

resource "aws_ecr_repository" "keep_server_staging" {
  name                 = "keep_server_staging"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

locals {
  repository_name = "keep-clone"

}




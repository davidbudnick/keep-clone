# Cluster secrets
resource "github_actions_environment_secret" "cluster_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CLUSTER_NAME"
  plaintext_value = aws_ecs_cluster.keep_cluster.name
}

# UI Secrets
resource "github_actions_environment_secret" "family_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_FAMILY_NAME_UI"
  plaintext_value = aws_ecs_task_definition.keep_ui_task_definition.family
}

resource "github_actions_environment_secret" "container_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CONTAINER_NAME_UI"
  plaintext_value = "keep-ui-${var.environment}"
}

resource "github_actions_environment_secret" "keep_ui_ecs_service_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_SERVICE_NAME_UI"
  plaintext_value = aws_ecs_service.keep_ui_service.name
}

# Server secrets
resource "github_actions_environment_secret" "family_name_server" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_FAMILY_NAME_SERVER"
  plaintext_value = aws_ecs_task_definition.keep_server_task_definition.family
}

resource "github_actions_environment_secret" "container_name_server" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CONTAINER_NAME_SERVER"
  plaintext_value = "keep-server-${var.environment}"
}

resource "github_actions_environment_secret" "service_name_server" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_SERVICE_NAME_SERVER"
  plaintext_value = aws_ecs_service.keep_server_service.name
}

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

resource "github_actions_environment_secret" "cluster_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_CLUSTER_NAME"
  plaintext_value = aws_ecs_cluster.keep_cluster.name
}

resource "github_actions_environment_secret" "keep_ui_ecs_service_name" {
  repository      = var.repository_name
  environment     = var.environment
  secret_name     = "ECS_SERVICE_NAME_UI"
  plaintext_value = aws_ecs_service.keep_ui_service.name
}

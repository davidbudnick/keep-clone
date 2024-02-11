provider "aws" {
  region = "us-east-1"
}

module "s3" {
  source = "./s3"
}

module "ecr" {
  source = "./ecr"
}

module "iam" {
  source              = "./iam"
  keep_ui_ecr_arn     = module.ecr.keep_ui_ecr_arn
  keep_server_ecr_arn = module.ecr.keep_server_ecr_arn
}

output "access_key_id" {
  value     = module.iam.access_key_id
  sensitive = true
}

output "secret_access_key" {
  value     = module.iam.secret_access_key
  sensitive = true
}

module "networking" {
  source           = "./networking"
  keep_secrets_arn = module.s3.keep_secrets_arn
}

module "ecs" {
  source                      = "./ecs"
  keep_secrets_arn            = module.s3.keep_secrets_arn
  keep_ui_ecr_image_name      = module.ecr.keep_ui_ecr_image_name
  ecs_task_execution_role_arn = module.networking.ecs_task_execution_role_arn
  keep_ui_alb_staging_arn     = module.networking.keep_ui_alb_staging_arn
  ecs_task_role_arn           = module.networking.ecs_task_role_arn
  keep_ui_alb_sg_id           = module.networking.keep_ui_alb_sg_id
  keep_ui_tg_staging_arn      = module.networking.keep_ui_tg_staging_arn
}
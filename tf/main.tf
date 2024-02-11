terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {}

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
  keep_ui_ecr_arn     = module.ecr.keep_ui_ecr_arn_staging
  keep_server_ecr_arn = module.ecr.keep_server_ecr_arn_staging
}

module "networking" {
  source = "./networking"
}

module "ecs" {
  source                      = "./ecs"
  keep_ui_ecr_image_name      = module.ecr.keep_ui_ecr_image_name_staging
  ecs_task_execution_role_arn = module.networking.ecs_task_execution_role_arn
  keep_ui_alb_staging_arn     = module.networking.keep_ui_alb_staging_arn
  ecs_task_role_arn           = module.networking.ecs_task_role_arn
  keep_ui_alb_sg_id           = module.networking.keep_ui_alb_sg_id
  keep_ui_tg_staging_arn      = module.networking.keep_ui_tg_staging_arn
}

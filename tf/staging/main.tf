terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "github" {}

provider "aws" {
  region = var.region
}

module "s3" {
  environment = var.environment
  source      = "../modules/s3"
}

module "ecr" {
  environment     = var.environment
  repository_name = var.repository_name
  source          = "../modules/ecr"
}

module "iam" {
  environment     = var.environment
  repository_name = var.repository_name
  source          = "../modules/iam"
}

module "ecs" {
  environment        = var.environment
  repository_name    = var.repository_name
  keep_ui_image_name = module.ecr.keep_ui_image_name
  source             = "../modules/ecs"
}

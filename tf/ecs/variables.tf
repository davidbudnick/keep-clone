variable "ecs_task_execution_role_arn" {
  type = string
}

variable "ecs_task_role_arn" {
  type = string
}

variable "keep_ui_ecr_image_name" {
  type = string
}

variable "keep_ui_alb_staging_arn" {
  type = string
}

variable "keep_ui_alb_sg_id" {
  type = string
}

variable "keep_ui_tg_staging_arn" {
  type = string
}

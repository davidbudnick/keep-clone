output "keep_ui_tg_staging_arn" {
  value = aws_lb_target_group.keep_ui_tg_staging.arn
}

output "keep_ui_alb_staging_arn" {
  value = aws_lb.keep_ui_alb_staging.arn
}

output "keep_ui_alb_sg_id" {
  value = aws_security_group.keep_ui_alb_sg.id
}

output "ecs_task_execution_role_arn" {
  value = aws_iam_role.ecs_task_execution_role.arn
}

output "ecs_task_role_arn" {
  value = aws_iam_role.ecs_task_role.arn
}


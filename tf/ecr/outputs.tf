output "keep_ui_ecr_image_name_staging" {
  value = "${aws_ecr_repository.keep_ui_staging.repository_url}:latest"
}

output "keep_ui_ecr_arn_staging" {
  value = aws_ecr_repository.keep_ui_staging.arn
}

output "keep_server_ecr_image_name_staging" {
  value = "${aws_ecr_repository.keep_server_staging.repository_url}:latest"
}

output "keep_server_ecr_arn_staging" {
  value = aws_ecr_repository.keep_server_staging.arn
}

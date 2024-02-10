output "keep_ui_ecr_image_name" {
  value = "${aws_ecr_repository.keep_ui.repository_url}:latest"
}

output "keep_ui_ecr_arn" {
  value = aws_ecr_repository.keep_ui.arn
}

output "keep_server_ecr_image_name" {
  value = "${aws_ecr_repository.keep_server.repository_url}:latest"
}

output "keep_server_ecr_arn" {
  value = aws_ecr_repository.keep_server.arn
}

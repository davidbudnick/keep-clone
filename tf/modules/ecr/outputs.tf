output "keep_ui_image_name" {
  value = "${aws_ecr_repository.keep_ui_repository.repository_url}:latest"
}

output "keep_server_image_name" {
  value = "${aws_ecr_repository.keep_server_repository.repository_url}:latest"
}

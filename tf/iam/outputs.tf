output "access_key_id" {
  value     = aws_iam_access_key.keep_user_github_access_key.id
  sensitive = true
}

output "secret_access_key" {
  value     = aws_iam_access_key.keep_user_github_access_key.secret
  sensitive = true
}

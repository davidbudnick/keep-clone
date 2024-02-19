output "bucket_arn" {
  value = aws_s3_bucket.bucket.arn
}

output "server_env_id" {
  value = aws_s3_object.server_env.id
}

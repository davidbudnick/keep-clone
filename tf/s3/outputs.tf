output "keep_secrets_arn" {
  description = "The ARN for the staging UI environment file in S3."
  value       = aws_s3_bucket.keep_secrets.arn
}

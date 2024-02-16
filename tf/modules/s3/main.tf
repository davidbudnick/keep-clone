resource "aws_s3_bucket" "bucket" {
  bucket = "keep-secrets-${var.environment}"
}

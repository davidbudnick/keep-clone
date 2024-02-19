resource "aws_s3_bucket" "bucket" {
  bucket = "keep-secrets-${var.environment}"
}

resource "aws_s3_object" "server_env" {
  bucket = aws_s3_bucket.bucket.id
  key    = "server.env"
  source = "./env/server.env"
}

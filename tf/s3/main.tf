resource "aws_s3_bucket" "keep_secrets" {
  bucket = "keep-secrets"
}

resource "aws_s3_object" "staging_ui_env" {
  bucket = aws_s3_bucket.keep_secrets.bucket
  key    = "staging.ui.env"
  source = "./env/staging.ui.env"
}

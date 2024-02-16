terraform {
  backend "s3" {
    bucket  = "tf-keep-staging"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

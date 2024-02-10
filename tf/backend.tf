terraform {
  backend "s3" {
    bucket  = "keep-tf"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

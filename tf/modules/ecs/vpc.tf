data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "alb_security_group" {
  name   = "keep-alb-security-group-${var.environment}"
  vpc_id = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    cidr_blocks      = []
    description      = "MongoDB"
    from_port        = 27017
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "tcp"
    security_groups  = []
    self             = true
    to_port          = 27017
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

## Apply First then run pipeline for images

```tf
terraform apply -target=module.s3
terraform apply -target=module.ecr
terraform apply -target=module.iam
```
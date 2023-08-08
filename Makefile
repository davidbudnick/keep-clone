client:
	rm -rf ui/src/client
	swagger-codegen generate -i keep-clone.yaml -l typescript-axios -o ui/src/client
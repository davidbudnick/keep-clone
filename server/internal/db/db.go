package db

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	DATABASE_NAME = "keep"
)

type DatabaseService interface {
	Client() *mongo.Client
}

type databaseService struct {
	client *mongo.Client
}

func NewDatabaseService(ctx context.Context, connection string, username string, password string) (DatabaseService, error) {
	client, err := mongo.Connect(ctx,
		options.Client().
			ApplyURI(connection).
			SetAuth(
				options.Credential{
					Username: username,
					Password: password,
				},
			))
	if err != nil {
		return nil, err
	}

	return &databaseService{
		client: client,
	}, nil
}

func (d *databaseService) Client() *mongo.Client {
	return d.client
}

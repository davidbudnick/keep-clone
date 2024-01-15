package db

import (
	"context"
	"log/slog"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	NAME         = "keep"
	USER_INDEX   = "user_id"
	STATUS_INDEX = "status"
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
		slog.ErrorContext(ctx, "Error creating database connection", "error", err)
		return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		slog.ErrorContext(ctx, "Error pinging database", "error", err)
		return nil, err
	}

	return &databaseService{
		client: client,
	}, nil
}

func (d *databaseService) Client() *mongo.Client {
	return d.client
}

package db

import (
	"context"
	"log/slog"
	"server/internal/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	USER_INDEX       = "user_id"
	STATUS_INDEX     = "status"
	DELETED_AT_INDEX = "deleted_at"
)

const (
	SET = "$set"
)

type DatabaseService interface {
	Client() *mongo.Client
	Name() string
}

type databaseService struct {
	client *mongo.Client
	config *config.Config
}

func NewDatabaseService(ctx context.Context, cfg *config.Config) (DatabaseService, error) {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.Database.Connection).SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1)))
	if err != nil {
		slog.ErrorContext(ctx, "Error creating database connection", "error", err)
		return nil, err
	}

	return &databaseService{
		client: client,
		config: cfg,
	}, nil
}

func (d *databaseService) Client() *mongo.Client {
	return d.client
}

func (d *databaseService) Name() string {
	return d.config.Database.Name
}

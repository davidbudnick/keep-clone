package db

import (
	"context"
	"log/slog"
	"server/internal/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func userInit(ctx context.Context, cfg *config.Config, client *mongo.Client) error {
	if err := client.Database(cfg.Database.Name).CreateCollection(ctx, USERS_COLLECTION); err != nil {
		slog.ErrorContext(ctx, "Error creating users collection", "error", err)
		return err
	}

	_, err := client.Database(cfg.Database.Name).Collection(USERS_COLLECTION).Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{
				Key:   "user_id",
				Value: 1,
			},
		},
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating user_id index", "error", err)
	}

	return nil
}

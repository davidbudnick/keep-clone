package db

import (
	"context"
	"log/slog"
	"server/internal/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func notesInit(ctx context.Context, cfg *config.Config, client *mongo.Client) error {
	const (
		USER_INDEX       = "user_id"
		STATUS_INDEX     = "status"
		DELETED_AT_INDEX = "deleted_at"
	)

	if err := client.Database(cfg.Database.Name).CreateCollection(ctx, NOTES_COLLECTION); err != nil {
		slog.ErrorContext(ctx, "Error creating notes collection", "error", err)
		return err
	}

	notesCollection := client.Database(cfg.Database.Name).Collection(NOTES_COLLECTION)
	_, err := notesCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{
				Key:   USER_INDEX,
				Value: 1,
			},
			{
				Key:   STATUS_INDEX,
				Value: 1,
			},
		},
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating indexes", "error", err)
	}

	_, err = notesCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{
				Key:   DELETED_AT_INDEX,
				Value: 1,
			},
		}, Options: options.Index().SetExpireAfterSeconds(24 * 60 * 60 * 7),
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating deletedAt index", "error", err)
	}

	return nil
}

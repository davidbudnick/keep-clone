package main

import (
	"context"
	"fmt"
	"os"
	"server/internal/app/handlers"
	"server/internal/app/notes"
	"server/internal/config"
	"server/internal/db"
	"server/internal/lib/log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/exp/slog"
)

const (
	V1 = "v1"
)

func main() {
	ctx := context.Background()

	c, err := config.GetConf("config.yml")
	if err != nil {
		panic(err)
	}

	databaseService, err := db.NewDatabaseService(ctx, c.Database.Connection, c.Database.Username, c.Database.Password)
	if err != nil {
		panic(err)
	}
	defer databaseService.Client().Disconnect(ctx)

	l := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		ReplaceAttr: log.ReplaceLevelWithSeverity,
		Level:       slog.LevelDebug,
	}))
	slog.SetDefault(l)

	notesCollection := databaseService.Client().Database(db.DATABASE_NAME).Collection(notes.NOTES_COLLECTION)
	_, err = notesCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{Key: "user_id", Value: 1},
			{Key: "status", Value: 1},
		},
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating index", "error", err)
	}

	r := gin.New()
	r.Use(sloggin.New(l))
	r.Use(gin.Recovery())

	config := cors.DefaultConfig()
	//TODO: change to frontend url
	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization", handlers.X_USER_ID}
	r.Use(cors.New(config))

	notesService := notes.NewNotesService(
		notes.NewNotesRepo(databaseService.Client()),
	)

	handlerService := handlers.NewHandlerService(notesService)

	r.GET(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.LIST), handlerService.List)
	r.GET(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.LIST_ARCHIVED), handlerService.ListArchived)
	r.GET(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.LIST_DELETED), handlerService.ListDeleted)
	r.GET(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.GET), handlerService.Get)
	r.POST(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.SAVE), handlerService.Save)
	r.POST(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.UPDATE), handlerService.Update)

	slog.Info("Starting GIN server", "port", c.Ports.HTTP)
	if err = r.Run(fmt.Sprintf(":%d", c.Ports.HTTP)); err != nil {
		slog.Error("Error starting GIN server", "error", err)
	}
}

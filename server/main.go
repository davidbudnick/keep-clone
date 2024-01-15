package main

import (
	"context"
	"fmt"
	"os"
	"server/graph"
	"server/internal/app/notes"
	"server/internal/config"
	"server/internal/db"
	"server/internal/middleware"

	"log/slog"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	ctx := context.Background()

	c, err := config.GetConfig(ctx, "config.yml")
	if err != nil {
		slog.ErrorContext(ctx, "Error getting config", "error", err)
		panic(err)
	}

	l := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
	slog.SetDefault(l)

	databaseService, err := db.NewDatabaseService(ctx, c.Database.Connection, c.Database.Username, c.Database.Password)
	if err != nil {
		slog.ErrorContext(ctx, "Error creating database service", "error", err)
		panic(err)
	}
	defer databaseService.Client().Disconnect(ctx)

	notesCollection := databaseService.Client().Database(db.NAME).Collection(notes.NOTES_COLLECTION)
	_, err = notesCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{
				Key:   db.USER_INDEX,
				Value: 1,
			},
			{
				Key:   db.STATUS_INDEX,
				Value: 1,
			},
		},
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating indexes", "error", err)
	}

	r := gin.New()
	r.Use(sloggin.New(l))
	r.Use(gin.Recovery())

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	r.Use(cors.New(config))
	r.Use(middleware.JWT(ctx, c))
	r.POST("/query", graphqlHandler(
		notes.NewNotesService(
			notes.NewNotesRepo(databaseService.Client()),
		),
	))
	r.GET("/", playgroundHandler())

	slog.InfoContext(ctx, "Starting GIN server", "port", c.Ports.HTTP)
	if err = r.Run(fmt.Sprintf(":%d", c.Ports.HTTP)); err != nil {
		slog.ErrorContext(ctx, "Error starting GIN server", "error", err)
	}
}

func graphqlHandler(notesService notes.NotesService) gin.HandlerFunc {
	return func(c *gin.Context) {
		handler.NewDefaultServer(graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					NotesService: notesService,
					UserID:       c.GetString(middleware.USER_ID),
				},
			},
		)).ServeHTTP(c.Writer, c.Request)
	}
}

func playgroundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		playground.Handler("GraphQL", "/query").ServeHTTP(c.Writer, c.Request)
	}
}

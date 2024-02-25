package main

import (
	"context"
	"fmt"
	"os"
	"server/graph"
	"server/internal/app/notes"
	"server/internal/app/users"
	"server/internal/config"
	"server/internal/db"
	"server/internal/health"
	"server/internal/middleware"

	"log/slog"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
)

func main() {
	ctx := context.Background()

	cfg, err := config.GetConfig(ctx, "config.yml")
	if err != nil {
		slog.ErrorContext(ctx, "Error getting config", "error", err)
		panic(err)
	}

	l := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
	slog.SetDefault(l)

	databaseService, err := db.NewDatabaseService(ctx, cfg)
	if err != nil {
		slog.ErrorContext(ctx, "Error creating database service", "error", err)
		panic(err)
	}
	defer databaseService.Client().Disconnect(ctx)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(sloggin.New(l))
	r.Use(gin.Recovery())

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	r.Use(cors.New(config))
	r.Use(middleware.JWT(ctx, cfg))

	health.Register(health.EXTERNAL_ENDPOINT, r)
	health.Register(health.INTERNAL_ENDPOINT, r)

	r.POST("/api/query", graphqlHandler(
		notes.NewNotesService(
			notes.NewNotesRepo(databaseService.Client(), databaseService.Name()),
		),
		users.NewUsersService(
			users.NewUsersRepo(databaseService.Client(), databaseService.Name()),
		),
	))
	r.GET("/api/playground", playgroundHandler())

	slog.InfoContext(ctx, "Starting GIN server", "port", cfg.Ports.HTTP)
	if err = r.Run(fmt.Sprintf(":%s", cfg.Ports.HTTP)); err != nil {
		slog.ErrorContext(ctx, "Error starting GIN server", "error", err)
	}
}

func graphqlHandler(notesService notes.NotesService, usersService users.UsersService) gin.HandlerFunc {
	return func(c *gin.Context) {
		handler.NewDefaultServer(graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					NotesService: notesService,
					UsersService: usersService,
					UserID:       c.GetString(middleware.USER_ID),
				},
			},
		)).ServeHTTP(c.Writer, c.Request)
	}
}

func playgroundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		playground.Handler("GraphQL", "/api/query").ServeHTTP(c.Writer, c.Request)
	}
}

package main

import (
	"context"
	"fmt"
	"os"
	"server/constants"
	"server/internal/app/notes"
	"server/internal/app/users"
	"server/internal/config"
	"server/internal/db"
	"server/internal/handlers"
	"server/internal/middleware"

	"log/slog"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/newrelic/go-agent/v3/integrations/logcontext-v2/nrslog"
	nrgin "github.com/newrelic/go-agent/v3/integrations/nrgin"
	"github.com/newrelic/go-agent/v3/integrations/nrmongo"
	"github.com/newrelic/go-agent/v3/newrelic"
	sloggin "github.com/samber/slog-gin"
)

func main() {
	ctx := context.Background()

	cfg, err := config.GetConfig(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting config", "error", err)
		panic(err)
	}

	app, err := newrelic.NewApplication(
		newrelic.ConfigAppName(cfg.Newrelic.Name),
		newrelic.ConfigLicense(cfg.Newrelic.Key),
		newrelic.ConfigAppLogForwardingEnabled(true),
	)
	if err != nil {
		slog.ErrorContext(ctx, "Error creating newrelic application", "error", err)
	}

	l := slog.New(nrslog.JSONHandler(app, os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
	slog.SetDefault(l)

	databaseService, err := db.NewDatabaseService(ctx, cfg, nrmongo.NewCommandMonitor(nil))
	if err != nil {
		slog.ErrorContext(ctx, "Error creating database service", "error", err)
		panic(err)
	}
	defer databaseService.Client().Disconnect(ctx)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(sloggin.New(l))
	r.Use(gin.Recovery())
	r.Use(nrgin.Middleware(app))

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	r.Use(cors.New(config))
	r.Use(middleware.JWT(ctx, cfg))

	handlers.Register(constants.ENDPOINT_HEALTH_EXTERNAL, r)
	handlers.Register(constants.ENDPOINT_HEALTH_INTERNAL, r)

	r.POST(constants.ENDPOINT_GRAPHQL, handlers.GraphqlHandler(
		notes.NewNotesService(
			notes.NewNotesRepo(databaseService.Client(), databaseService.Name(), app),
		),
		users.NewUsersService(
			users.NewUsersRepo(databaseService.Client(), databaseService.Name(), app),
		),
	))
	r.GET(constants.ENDPOINT_GRAPHQL_PLAYGROUND, handlers.PlaygroundHandler())

	slog.InfoContext(ctx, "Starting GIN server", "port", cfg.Ports.HTTP)
	if err = r.Run(fmt.Sprintf(":%s", cfg.Ports.HTTP)); err != nil {
		slog.ErrorContext(ctx, "Error starting GIN server", "error", err)
	}
}

package main

import (
	"context"
	"fmt"
	"os"
	"server/internal/config"
	"server/internal/db"
	"server/internal/handlers"
	"server/internal/lib/log"
	"server/internal/notes"

	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
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

	r := gin.New()
	r.Use(sloggin.New(l))
	r.Use(gin.Recovery())

	notesService := notes.NewNotesService(
		notes.NewNotesRepo(databaseService.Client()),
	)

	handlerService := handlers.NewHandlerService(notesService)

	r.GET(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.LIST), handlerService.List)
	r.GET(fmt.Sprintf("%s/%s/%s/:id", V1, handlers.NOTES, handlers.GET), handlerService.Get)
	r.POST(fmt.Sprintf("%s/%s/%s", V1, handlers.NOTES, handlers.SAVE), handlerService.Save)

	slog.Info("Starting GIN server", "port", c.Ports.HTTP)
	if err = r.Run(fmt.Sprintf(":%d", c.Ports.HTTP)); err != nil {
		slog.Error("Error starting GIN server", "error", err)
	}
}

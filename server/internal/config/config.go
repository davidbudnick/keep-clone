package config

import (
	"context"
	"errors"
	"os"

	"log/slog"

	"github.com/joho/godotenv"
)

type Config struct {
	Database Database
	Ports    Ports
	JWT      JWT
}

type Database struct {
	Connection string
	Name       string
}

type Ports struct {
	HTTP string
}

type JWT struct {
	ClientID string
}

var (
	ErrReadingEnvFile = errors.New("error reading env file")
)

func GetConfig(ctx context.Context, fileName string) (*Config, error) {
	err := godotenv.Load()
	if err != nil {
		slog.ErrorContext(ctx, "Error loading .env file", "error", err)
		return nil, ErrReadingEnvFile
	}

	var conf Config = Config{
		Database{
			Connection: os.Getenv("DB_CONNECTION"),
			Name:       os.Getenv("DB_NAME"),
		},
		Ports{
			HTTP: os.Getenv("PORT"),
		},
		JWT{
			ClientID: os.Getenv("JWT_CLIENT_ID"),
		},
	}

	return &conf, nil
}

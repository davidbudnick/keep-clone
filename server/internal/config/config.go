package config

import (
	"context"
	"errors"
	"os"

	"log/slog"

	"github.com/joho/godotenv"
)

type Config struct {
	Environment Environment
	Database    Database
	Ports       Ports
	JWT         JWT
	Newrelic    Newrelic
}

type Newrelic struct {
	Name string
	Key  string
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

type Environment struct {
	Env string
}

type Env string

const (
	Staging     Env = "staging"
	Production  Env = "production"
	Development Env = "development"
)

func GetConfig(ctx context.Context) (*Config, error) {
	if os.Getenv("ENV") != string(Staging) && os.Getenv("ENV") != string(Production) {
		err := godotenv.Load()
		if err != nil {
			slog.ErrorContext(ctx, "Error loading .env file", "error", err)
			return nil, ErrReadingEnvFile
		}
	}

	var conf Config = Config{
		Environment{
			Env: os.Getenv("ENV"),
		},
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
		Newrelic{
			Name: os.Getenv("NEWRELIC_NAME"),
			Key:  os.Getenv("NEWRELIC_KEY"),
		},
	}

	return &conf, nil
}

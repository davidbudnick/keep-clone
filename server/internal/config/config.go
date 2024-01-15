package config

import (
	"context"
	"errors"

	"log/slog"

	"github.com/spf13/viper"
)

type Config struct {
	Database Database
	Ports    Ports
	JWT      JWT
}

type Database struct {
	Connection string
	Username   string
	Password   string
}

type Ports struct {
	HTTP int
}

type JWT struct {
	ClientID string
}

var (
	ErrConfigFileNameEmpty = errors.New("error config file is empty")
	ErrReadingConfigFile   = errors.New("error reading config file")
	ErrDecodingConfigFile  = errors.New("error decoding config file")
)

func GetConfig(ctx context.Context, fileName string) (*Config, error) {
	v := viper.New()
	if fileName == "" {
		slog.ErrorContext(ctx, ErrConfigFileNameEmpty.Error())
		return nil, ErrConfigFileNameEmpty
	}

	v.SetConfigFile(fileName)

	err := v.ReadInConfig()
	if err != nil {
		slog.ErrorContext(ctx, "Fatal error config file", "error", err)
		return nil, err
	}

	var conf Config
	err = v.Unmarshal(&conf)
	if err != nil {
		slog.ErrorContext(ctx, "unable to decode into config struct", "error", err)
		return nil, err
	}

	return &conf, nil
}

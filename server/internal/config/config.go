package config

import (
	"errors"

	"github.com/spf13/viper"
	"golang.org/x/exp/slog"
)

type Config struct {
	Database Database
	Ports    Ports
}

type Database struct {
	Connection string
	Username   string
	Password   string
}

type Ports struct {
	HTTP int
}

var (
	ErrConfigFileNameEmpty = errors.New("error config file is empty")
	ErrReadingConfigFile   = errors.New("error reading config file")
	ErrDecodingConfigFile  = errors.New("error decoding config file")
)

func GetConfig(fileName string) (*Config, error) {
	v := viper.New()
	if fileName == "" {
		slog.Error(ErrConfigFileNameEmpty.Error())
		return nil, ErrConfigFileNameEmpty
	}

	v.SetConfigFile(fileName)

	err := v.ReadInConfig()
	if err != nil {
		slog.Error("Fatal error config file", "error", err)
		return nil, err
	}

	var conf Config
	err = v.Unmarshal(&conf)
	if err != nil {
		slog.Error("unable to decode into config struct", "error", err)
		return nil, err
	}

	return &conf, nil
}

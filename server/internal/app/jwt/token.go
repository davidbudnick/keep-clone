package jwt

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"server/graph/model"
	"server/internal/config"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type GoogleUserInfo struct {
	UserID        string `json:"sub"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
	HD            string `json:"hd"`
}

func GenerateTokens(ctx context.Context, code string, jwtConfig config.JWT) (*GoogleUserInfo, *model.AuthLoginTokens, error) {
	conf := &oauth2.Config{
		ClientID:     jwtConfig.ClientID,
		ClientSecret: jwtConfig.ClientSecret,
		RedirectURL:  jwtConfig.RedirectURL,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "openid"},
		Endpoint:     google.Endpoint,
	}

	tok, err := conf.Exchange(ctx, code)
	if err != nil {
		slog.ErrorContext(ctx, "Error exchanging code for token", "error", err)
		return nil, nil, err
	}

	idToken, ok := tok.Extra("id_token").(string)
	if !ok {
		err := fmt.Errorf("no id_token field in oauth2 token")
		slog.ErrorContext(ctx, "Error getting ID token", "error", err)
		return nil, nil, err
	}

	client := conf.Client(ctx, tok)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		slog.ErrorContext(ctx, "Error getting user info", "error", err)
		return nil, nil, err
	}
	defer resp.Body.Close()

	var userInfo GoogleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		slog.ErrorContext(ctx, "Error decoding user info", "error", err)
		return nil, nil, err
	}

	return &userInfo,
		&model.AuthLoginTokens{
			AccessToken:  idToken,
			RefreshToken: tok.RefreshToken,
			Exp:          tok.Expiry.Format(time.RFC3339),
		}, nil
}

type TokenResponse struct {
	AccessToken string `json:"access_token"`
}

func RefreshAccessToken(ctx context.Context, refreshToken string, jwtConfig config.JWT) (*oauth2.Token, error) {
	conf := &oauth2.Config{
		ClientID:     jwtConfig.ClientID,
		ClientSecret: jwtConfig.ClientSecret,
		Endpoint:     google.Endpoint,
	}

	tokenSource := conf.TokenSource(ctx, &oauth2.Token{
		RefreshToken: refreshToken,
	})
	newToken, err := tokenSource.Token()
	if err != nil {
		slog.ErrorContext(ctx, "Error refreshing access token", "error", err)
		return nil, err
	}

	return newToken, nil
}

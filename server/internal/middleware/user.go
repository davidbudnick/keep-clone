package middleware

import (
	"context"
	"fmt"
	"log/slog"
	"server/constants"
	"server/internal/config"
	"strings"

	"google.golang.org/api/idtoken"
)

var (
	ErrNoAuthorization = fmt.Errorf("no token found in Authorization header")
	ErrNoToken         = fmt.Errorf("no token provided")
	ErrInvalidUserID   = fmt.Errorf("invalid user ID in token")
)

func ValidateJWT(ctx context.Context, jwtConfig config.JWT) (string, error) {
	authHeader, ok := ctx.Value(constants.AuthorizationKey).(string)
	if !ok || authHeader == "" {
		slog.ErrorContext(ctx, "Error getting Authorization value from context", "error", ErrNoAuthorization.Error())
		return "", ErrNoAuthorization
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == "" {
		slog.ErrorContext(ctx, "No Bearer token provided", "error", ErrNoToken.Error())
		return "", ErrNoToken
	}

	payload, err := idtoken.Validate(ctx, tokenString, jwtConfig.ClientID)
	if err != nil {
		slog.ErrorContext(ctx, "Error validating token", "error", err)
		return "", err
	}

	userID, ok := payload.Claims[constants.SUB].(string)
	if !ok {
		slog.ErrorContext(ctx, "UserID not found in payload claims", "error", ErrInvalidUserID.Error())
		return "", ErrInvalidUserID
	}

	return userID, nil
}

package middleware

import (
	"context"
	"fmt"
	"log/slog"
)

func ValidateUserID(ctx context.Context, userID string) error {
	if userID == "" {
		slog.ErrorContext(ctx, "UserID required")
		return fmt.Errorf("UserID required")
	}
	return nil
}

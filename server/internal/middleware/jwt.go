package middleware

import (
	"context"
	"log/slog"
	"server/internal/config"
	"server/internal/health"
	"strings"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/idtoken"
)

const (
	USER_ID = "user_id"
	SUB     = "sub"
)

func JWT(ctx context.Context, conf *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.URL.Path == health.EXTERNAL_ENDPOINT || c.Request.URL.Path == health.INTERNAL_ENDPOINT {
			c.Next()
			return
		}

		tokenString := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		if tokenString == "" {
			slog.ErrorContext(ctx, "No token provided")
			c.Next()
			return
		}

		payload, err := idtoken.Validate(ctx, tokenString, conf.JWT.ClientID)
		if err != nil {
			slog.ErrorContext(ctx, "Error validating token", "error", err)

		}

		if payload != nil {
			c.Set(USER_ID, payload.Claims[SUB])
		}

		c.Next()
	}
}

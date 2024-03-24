package middleware

import (
	"context"
	"log/slog"
	"server/constants"
	"server/internal/config"
	"strings"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/idtoken"
)

func JWT(ctx context.Context, conf *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.URL.Path == constants.ENDPOINT_HEALTH_INTERNAL || c.Request.URL.Path == constants.ENDPOINT_HEALTH_EXTERNAL {
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
			c.Set(constants.USER_ID, payload.Claims[constants.SUB])
		}

		c.Next()
	}
}

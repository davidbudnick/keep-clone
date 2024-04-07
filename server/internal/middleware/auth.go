package middleware

import (
	"server/constants"

	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(
			c.Request.Context(), constants.AuthorizationKey, c.Request.Header.Get("Authorization"),
		)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

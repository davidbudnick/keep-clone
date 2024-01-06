package middleware

import (
	"fmt"
	"server/internal/config"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func JWT(config *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		if tokenString != "" {
			token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["kid"])
				}

				return []byte(config.JWT.Secret), nil
			})
			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				c.Set("user_id", claims["sub"])
			}
		}

		//TODO: validate token and set claims
		// if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// 	// Pass the claims to the next middleware or handler
		// 	c.Set("claims", claims)
		// } else {
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err})
		// 	return
		// }

		c.Next()
	}
}

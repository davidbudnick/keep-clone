package handlers

import (
	"server/constants"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
)

func PlaygroundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		playground.Handler("GraphQL", constants.ENDPOINT_GRAPHQL_PLAYGROUND).ServeHTTP(c.Writer, c.Request)
	}
}

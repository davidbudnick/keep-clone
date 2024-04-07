package handlers

import (
	"server/graph"
	"server/internal/app/notes"
	"server/internal/app/users"
	"server/internal/config"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/gin-gonic/gin"
)

func GraphqlHandler(notesService notes.NotesService, usersService users.UsersService, jwtConfig config.JWT) gin.HandlerFunc {
	return func(c *gin.Context) {
		handler.NewDefaultServer(graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					NotesService: notesService,
					UsersService: usersService,
					JWTConfig:    jwtConfig,
				},
			},
		)).ServeHTTP(c.Writer, c.Request)
	}
}

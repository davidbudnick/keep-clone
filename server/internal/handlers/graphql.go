package handlers

import (
	"server/constants"
	"server/graph"
	"server/internal/app/notes"
	"server/internal/app/users"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/gin-gonic/gin"
)

func GraphqlHandler(notesService notes.NotesService, usersService users.UsersService) gin.HandlerFunc {
	return func(c *gin.Context) {
		handler.NewDefaultServer(graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					NotesService: notesService,
					UsersService: usersService,
					UserID:       c.GetString(constants.USER_ID),
				},
			},
		)).ServeHTTP(c.Writer, c.Request)
	}
}

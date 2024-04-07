package graph

import (
	"server/internal/app/notes"
	"server/internal/app/users"
	"server/internal/config"
)

type Resolver struct {
	NotesService notes.NotesService
	UsersService users.UsersService
	JWTConfig    config.JWT
}

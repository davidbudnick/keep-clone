package graph

import (
	"server/internal/app/notes"
	"server/internal/app/users"
)

type Resolver struct {
	NotesService notes.NotesService
	UsersService users.UsersService
	UserID       string
}

package graph

import "server/internal/app/notes"

type Resolver struct {
	NotesService notes.NotesService
	UserID       string
}

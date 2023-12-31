package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.38

import (
	"context"
	"fmt"
	"log/slog"
	"server/graph/model"
)

// CreateNote is the resolver for the createNote field.
func (r *mutationResolver) CreateNote(ctx context.Context, input model.NewNote) (*model.Note, error) {
	if !model.Status(input.Status).IsValid() {
		slog.Error("invalid status", "status", input.Status)
		return nil, fmt.Errorf("invalid status")
	}

	note, err := r.NotesService.Create(ctx, r.UserID, input)
	if err != nil {
		return nil, err
	}

	return note, nil
}

// UpdateNote is the resolver for the updateNote field.
func (r *mutationResolver) UpdateNote(ctx context.Context, input model.UpdateNote) (*model.Note, error) {
	res, err := r.NotesService.Update(ctx, r.UserID, input)
	if err != nil {
		return nil, err
	}

	return res, nil
}

// DeleteNote is the resolver for the deleteNote field.
func (r *mutationResolver) DeleteNote(ctx context.Context, id string) (*model.Note, error) {
	panic(fmt.Errorf("not implemented: DeleteNote - deleteNote"))
}

// Notes is the resolver for the Notes field.
func (r *queryResolver) Notes(ctx context.Context, status *model.Status) ([]*model.Note, error) {
	notes, err := r.NotesService.List(ctx, status.String(), r.UserID)
	if err != nil {
		return nil, err
	}

	return notes, nil
}

// Note is the resolver for the Note field.
func (r *queryResolver) Note(ctx context.Context, id string) (*model.Note, error) {
	note, err := r.NotesService.Get(ctx, r.UserID, id)
	if err != nil {
		return nil, err
	}

	return note, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

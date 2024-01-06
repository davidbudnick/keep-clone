package notes

import (
	"context"
	"server/graph/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/exp/slog"
)

//go:generate counterfeiter -o fakes/fake_notes_service.go . NotesService
type NotesService interface {
	List(ctx context.Context, status string, userID string) ([]*model.Note, error)
	Get(ctx context.Context, userID string, noteID string) (*model.Note, error)
	Create(ctx context.Context, userID string, note model.NewNote) (*model.Note, error)
	Update(ctx context.Context, userID string, note model.UpdateNote) (*model.Note, error)
}

type notesService struct {
	repo NotesRepo
}

func NewNotesService(repo NotesRepo) NotesService {
	return &notesService{
		repo: repo,
	}
}

func (s *notesService) List(ctx context.Context, status string, userID string) ([]*model.Note, error) {
	notesInternal, err := s.repo.List(ctx, userID, status)
	if err != nil {
		slog.ErrorContext(ctx, "Error listing notes", "error", err, "status", status)
		return nil, err
	}

	var notes []*model.Note
	for _, note := range notesInternal {
		notes = append(notes, &model.Note{
			ID:        note.ID.Hex(),
			UserID:    note.UserID,
			Title:     note.Title,
			Body:      note.Body,
			Status:    note.Status,
			CreatedAt: note.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: note.UpdatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return notes, nil
}

func (s *notesService) Get(ctx context.Context, userID string, noteID string) (*model.Note, error) {
	note, err := s.repo.Get(ctx, userID, noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return &model.Note{
		ID:        note.ID.Hex(),
		UserID:    note.UserID,
		Title:     note.Title,
		Body:      note.Body,
		Status:    note.Status,
		CreatedAt: note.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: note.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}

func (s *notesService) Create(ctx context.Context, userID string, note model.NewNote) (*model.Note, error) {
	res, err := s.repo.Create(ctx, userID, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error saving note", "error", err)
		return nil, err
	}

	newNote, err := s.Get(ctx, userID, res.InsertedID.(primitive.ObjectID).Hex())
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return newNote, nil
}

func (s *notesService) Update(ctx context.Context, userID string, note model.UpdateNote) (*model.Note, error) {
	res, err := s.repo.Update(ctx, userID, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return nil, err
	}

	updatedNote, err := s.Get(ctx, userID, res.UpsertedID.(primitive.ObjectID).Hex())
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return updatedNote, nil
}

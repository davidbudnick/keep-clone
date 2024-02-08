package notes

import (
	"context"
	"server/graph/model"
	"sort"

	"log/slog"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//go:generate counterfeiter -o fakes/fake_notes_service.go . NotesService
type NotesService interface {
	List(ctx context.Context, status string, userID string) ([]*model.Note, error)
	Get(ctx context.Context, userID string, noteID string) (*model.Note, error)
	Create(ctx context.Context, userID string, note model.CreateNote) (*model.Note, error)
	Update(ctx context.Context, userID string, note model.UpdateNote) (*model.Note, error)
	RemoveDeleted(ctx context.Context, userID string) ([]*model.Note, error)
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

		var deletedAtStr *string
		if note.DeletedAt != nil {
			formatted := note.DeletedAt.Format("2006-01-02 15:04:05")
			deletedAtStr = &formatted
		}

		notes = append(notes, &model.Note{
			ID:        note.ID.Hex(),
			UserID:    note.UserID,
			Title:     note.Title,
			Body:      note.Body,
			Pinned:    note.Pinned,
			Status:    note.Status,
			CreatedAt: note.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: note.UpdatedAt.Format("2006-01-02 15:04:05"),
			DeletedAt: deletedAtStr,
		})
	}

	sort.Slice(notes, func(i, j int) bool {
		return notes[i].UpdatedAt > notes[j].UpdatedAt
	})

	return notes, nil
}

func (s *notesService) Get(ctx context.Context, userID string, noteID string) (*model.Note, error) {
	note, err := s.repo.Get(ctx, userID, noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	var deletedAtStr *string
	if note.DeletedAt != nil {
		formatted := note.DeletedAt.Format("2006-01-02 15:04:05")
		deletedAtStr = &formatted
	}

	return &model.Note{
		ID:        note.ID.Hex(),
		UserID:    note.UserID,
		Title:     note.Title,
		Body:      note.Body,
		Status:    note.Status,
		Pinned:    note.Pinned,
		CreatedAt: note.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: note.UpdatedAt.Format("2006-01-02 15:04:05"),
		DeletedAt: deletedAtStr,
	}, nil
}

func (s *notesService) Create(ctx context.Context, userID string, note model.CreateNote) (*model.Note, error) {
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
	err := s.repo.Update(ctx, userID, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return nil, err
	}

	updatedNote, err := s.Get(ctx, userID, note.ID)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return updatedNote, nil
}

func (s *notesService) RemoveDeleted(ctx context.Context, userID string) ([]*model.Note, error) {
	err := s.repo.RemoveDeleted(ctx, userID)
	if err != nil {
		slog.ErrorContext(ctx, "Error deleting notes", "error", err)
		return nil, err
	}

	deletedNotes, err := s.List(ctx, model.StatusDeleted.String(), userID)
	if err != nil {
		slog.ErrorContext(ctx, "Error listing deleted notes", "error", err)
		return nil, err
	}

	return deletedNotes, nil
}

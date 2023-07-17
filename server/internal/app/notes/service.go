package notes

import (
	"context"

	"golang.org/x/exp/slog"
)

type NotesService interface {
	List(ctx context.Context, userID string) ([]Note, error)
	ListArchived(ctx context.Context, userID string) ([]Note, error)
	ListDeleted(ctx context.Context, userID string) ([]Note, error)
	Get(ctx context.Context, userID string, noteID string) (*Note, error)
	Save(ctx context.Context, note *Note) error
	Update(ctx context.Context, note *Note) error
}

type notesService struct {
	repo NotesRepo
}

func NewNotesService(repo NotesRepo) NotesService {
	return &notesService{
		repo: repo,
	}
}

func (s *notesService) List(ctx context.Context, userID string) ([]Note, error) {
	notes, err := s.repo.List(ctx, userID, STATUS_ACTIVE)
	if err != nil {
		slog.ErrorContext(ctx, "Error listing notes", "error", err)
		return nil, err
	}

	if len(notes) == 0 {
		return []Note{}, nil
	}

	return notes, nil
}

func (s *notesService) ListArchived(ctx context.Context, userID string) ([]Note, error) {
	notes, err := s.repo.List(ctx, userID, STATUS_ARCHIVED)
	if err != nil {
		slog.ErrorContext(ctx, "Error listing archived notes", "error", err)
		return nil, err
	}

	if len(notes) == 0 {
		return []Note{}, nil
	}

	return notes, nil
}

func (s *notesService) ListDeleted(ctx context.Context, userID string) ([]Note, error) {
	notes, err := s.repo.List(ctx, userID, STATUS_DELETED)
	if err != nil {
		slog.ErrorContext(ctx, "Error listing deleted notes", "error", err)
		return nil, err
	}

	if len(notes) == 0 {
		return []Note{}, nil
	}

	return notes, nil
}

func (s *notesService) Get(ctx context.Context, userID string, noteID string) (*Note, error) {
	note, err := s.repo.Get(ctx, userID, noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return note, nil
}

func (s *notesService) Save(ctx context.Context, note *Note) error {
	err := s.repo.Save(ctx, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error saving note", "error", err)
		return err
	}

	return nil
}

func (s *notesService) Update(ctx context.Context, note *Note) error {
	err := s.repo.Update(ctx, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return err
	}

	return nil
}

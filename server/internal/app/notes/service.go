package notes

import (
	"context"
	"errors"
	"server/graph/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/exp/slog"
)

type NotesService interface {
	List(ctx context.Context, status *model.Status, userID string) ([]*model.Note, error)
	Get(ctx context.Context, userID string, noteID string) (*model.Note, error)
	Create(ctx context.Context, userID string, note model.NewNote) (*model.Note, error)
	Update(ctx context.Context, userID string, note model.UpdateNote) (*model.NoteMutationResponse, error)
}

var (
	ErrStatusInvalid = errors.New("invalid status")
)

type notesService struct {
	repo NotesRepo
}

func NewNotesService(repo NotesRepo) NotesService {
	return &notesService{
		repo: repo,
	}
}

func (s *notesService) List(ctx context.Context, status *model.Status, userID string) ([]*model.Note, error) {
	if status == nil || !status.IsValid() {
		slog.ErrorContext(ctx, ErrStatusInvalid.Error(), "status", status)
		return nil, ErrStatusInvalid
	}

	notesInternal, err := s.repo.List(ctx, userID, *status)
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

	//get the note
	newNote, err := s.Get(ctx, userID, res.InsertedID.(primitive.ObjectID).Hex())
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return newNote, nil
}

func (s *notesService) Update(ctx context.Context, userID string, note model.UpdateNote) (*model.NoteMutationResponse, error) {
	res, err := s.repo.Update(ctx, userID, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return &model.NoteMutationResponse{
			Success: false,
		}, err
	}

	return &model.NoteMutationResponse{
		ID:      res.UpsertedID.(primitive.ObjectID).Hex(),
		Success: true,
	}, nil
}

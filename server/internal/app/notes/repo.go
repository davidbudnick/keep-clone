package notes

import (
	"context"
	"server/internal/db"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/exp/slog"
)

const (
	STATUS_ACTIVE   = "ACTIVE"
	STATUS_ARCHIVED = "ARCHIVED"
	STATUS_DELETED  = "DELETED"
)

const (
	NOTES_COLLECTION = "notes"
)

type NotesRepo interface {
	List(ctx context.Context, userID string, status string) ([]Note, error)
	Get(ctx context.Context, userID string, noteID string) (*Note, error)
	Save(ctx context.Context, note *Note) error
	Update(ctx context.Context, note *Note) error
}

type notesRepo struct {
	Client *mongo.Client
}

func NewNotesRepo(client *mongo.Client) NotesRepo {
	return &notesRepo{
		Client: client,
	}
}

type Note struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    string             `bson:"user_id" json:"user_id"`
	Title     string             `bson:"title" json:"title"`
	Body      string             `bson:"body" json:"body"`
	Status    string             `bson:"status" json:"status"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
}

func (r *notesRepo) List(ctx context.Context, userID string, status string) ([]Note, error) {
	notesCollection := r.Client.Database(db.DATABASE_NAME).Collection(NOTES_COLLECTION)
	cursor, err := notesCollection.Find(ctx, bson.M{
		"user_id": userID,
		"status":  status,
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error listing notes", "error", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var notes []Note
	if err = cursor.All(ctx, &notes); err != nil {
		slog.ErrorContext(ctx, "Error listing notes", "error", err)
		return nil, err
	}

	return notes, nil
}

func (r *notesRepo) Get(ctx context.Context, userID string, noteID string) (*Note, error) {
	notesCollection := r.Client.Database(db.DATABASE_NAME).Collection(NOTES_COLLECTION)

	objectId, err := primitive.ObjectIDFromHex(noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error decoding NoteID", "error", err)
		return nil, err
	}

	var note Note
	err = notesCollection.FindOne(ctx, bson.M{
		"_id":     objectId,
		"user_id": userID,
	}).Decode(&note)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return &note, nil
}

func (r *notesRepo) Save(ctx context.Context, note *Note) error {
	notesCollection := r.Client.Database(db.DATABASE_NAME).Collection(NOTES_COLLECTION)
	_, err := notesCollection.InsertOne(ctx, note)
	if err != nil {
		slog.ErrorContext(ctx, "Error saving note", "error", err)
		return err
	}

	return nil
}

func (r *notesRepo) Update(ctx context.Context, note *Note) error {
	notesCollection := r.Client.Database(db.DATABASE_NAME).Collection(NOTES_COLLECTION)

	_, err := notesCollection.UpdateOne(ctx, bson.M{
		"_id":     note.ID,
		"user_id": note.UserID,
	}, bson.M{
		"$set": bson.M{
			"title":      note.Title,
			"body":       note.Body,
			"status":     note.Status,
			"updated_at": time.Now(),
		},
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return err
	}

	return nil
}

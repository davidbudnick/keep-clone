package notes

import (
	"context"
	"log/slog"
	"server/graph/model"
	"server/internal/db"
	"time"

	"github.com/newrelic/go-agent/v3/newrelic"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//go:generate counterfeiter -o fakes/fake_notes_repo.go . NotesRepo
type NotesRepo interface {
	List(ctx context.Context, userID string, status string) ([]Note, error)
	Get(ctx context.Context, userID string, noteID string) (*Note, error)
	Create(ctx context.Context, userID string, note model.CreateNote) (*mongo.InsertOneResult, error)
	Update(ctx context.Context, userID string, note model.UpdateNote) error
	Delete(ctx context.Context, userID string, noteID string) (*primitive.ObjectID, error)
	RemoveDeleted(ctx context.Context, userID string) error
}

type notesRepo struct {
	Client       *mongo.Client
	DatabaseName string
	NewrelicApp  *newrelic.Application
}

func NewNotesRepo(client *mongo.Client, databaseName string, newrelicApp *newrelic.Application) NotesRepo {
	return &notesRepo{
		Client:       client,
		DatabaseName: databaseName,
		NewrelicApp:  newrelicApp,
	}
}

type Note struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	UserID    string             `bson:"user_id"`
	Title     string             `bson:"title"`
	Body      string             `bson:"body"`
	Status    string             `bson:"status"`
	Pinned    bool               `bson:"pinned"`
	CreatedAt time.Time          `bson:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at"`
	DeletedAt *time.Time         `bson:"deleted_at"`
}

type GetFilter struct {
	ID     primitive.ObjectID `bson:"_id"`
	UserID string             `bson:"user_id"`
}

type ListFilter struct {
	UserID string `bson:"user_id"`
	Status string `bson:"status"`
}

func (r *notesRepo) List(ctx context.Context, userID string, status string) ([]Note, error) {
	txn := r.NewrelicApp.StartTransaction("Mongo List Notes")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	cursor, err := r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION).Find(ctx, ListFilter{
		UserID: userID,
		Status: status,
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
	txn := r.NewrelicApp.StartTransaction("Mongo Get Note")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	objectId, err := primitive.ObjectIDFromHex(noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error decoding NoteID", "error", err)
		return nil, err
	}

	var note Note
	err = r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION).FindOne(ctx,
		GetFilter{
			ID:     objectId,
			UserID: userID,
		},
	).Decode(&note)
	if err != nil {
		slog.ErrorContext(ctx, "Error getting note", "error", err)
		return nil, err
	}

	return &note, nil
}

func (r *notesRepo) Create(ctx context.Context, userID string, note model.CreateNote) (*mongo.InsertOneResult, error) {
	txn := r.NewrelicApp.StartTransaction("Mongo Create Note")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	var deletedAt *time.Time
	if note.Status == model.StatusDeleted.String() {
		now := time.Now()
		deletedAt = &now
	}

	notesCollection := r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION)
	res, err := notesCollection.InsertOne(ctx, Note{
		ID:        primitive.NewObjectID(),
		UserID:    userID,
		Title:     note.Title,
		Body:      note.Body,
		Status:    note.Status,
		Pinned:    note.Pinned,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		DeletedAt: deletedAt,
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error saving note", "error", err)
		return nil, err
	}

	return res, nil
}

type UpdateSet struct {
	Tilte     string     `bson:"title"`
	Body      string     `bson:"body"`
	Status    string     `bson:"status"`
	Pinned    bool       `bson:"pinned"`
	UpdateAt  time.Time  `bson:"updated_at"`
	DeletedAt *time.Time `bson:"deleted_at"`
}

func (r *notesRepo) Update(ctx context.Context, userID string, note model.UpdateNote) error {
	txn := r.NewrelicApp.StartTransaction("Mongo Update Note")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	notesCollection := r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION)

	objectId, err := primitive.ObjectIDFromHex(note.ID)
	if err != nil {
		slog.ErrorContext(ctx, "Error decoding NoteID", "error", err)
		return err
	}

	var deletedAt *time.Time
	if note.Status == model.StatusDeleted.String() {
		now := time.Now()
		deletedAt = &now
	}

	_, err = notesCollection.UpdateOne(ctx, GetFilter{
		ID:     objectId,
		UserID: userID,
	}, bson.M{
		db.SET: UpdateSet{
			Tilte:     note.Title,
			Body:      note.Body,
			Status:    note.Status,
			Pinned:    note.Pinned,
			UpdateAt:  time.Now(),
			DeletedAt: deletedAt,
		},
	}, options.Update().SetUpsert(true))
	if err != nil {
		slog.ErrorContext(ctx, "Error updating note", "error", err)
		return err
	}

	return nil
}

func (r *notesRepo) Delete(ctx context.Context, userID string, noteID string) (*primitive.ObjectID, error) {
	txn := r.NewrelicApp.StartTransaction("Mongo Delete Note")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	objectId, err := primitive.ObjectIDFromHex(noteID)
	if err != nil {
		slog.ErrorContext(ctx, "Error decoding NoteID", "error", err)
		return nil, err
	}

	notesCollection := r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION)
	_, err = notesCollection.DeleteOne(ctx, GetFilter{
		ID:     objectId,
		UserID: userID,
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error deleting note", "error", err)
		return nil, err
	}

	return &objectId, nil
}

type RemoveDeletedFilter struct {
	UserID string `bson:"user_id"`
	Status string `bson:"status"`
}

func (r *notesRepo) RemoveDeleted(ctx context.Context, userID string) error {
	txn := r.NewrelicApp.StartTransaction("Mongo Remove Deleted Notes")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	_, err := r.Client.Database(r.DatabaseName).Collection(db.NOTES_COLLECTION).DeleteMany(ctx, RemoveDeletedFilter{
		UserID: userID,
		Status: model.StatusDeleted.String(),
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error deleting notes", "error", err)
		return err
	}

	return nil
}

package users

import (
	"context"
	"errors"
	"log/slog"
	"server/graph/model"
	"server/internal/db"
	"time"

	"github.com/newrelic/go-agent/v3/newrelic"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//go:generate counterfeiter -o fakes/fake_users_repo.go . UsersRepo
type UsersRepo interface {
	Get(ctx context.Context, userID string) (*User, error)
	Create(ctx context.Context, user model.UpdateUser) error
	Update(ctx context.Context, userID string, user model.UpdateUser) error
}

type usersRepo struct {
	Client       *mongo.Client
	DatabaseName string
	NewrelicApp  *newrelic.Application
}

func NewUsersRepo(client *mongo.Client, databaseName string, newrelicApp *newrelic.Application) UsersRepo {
	return &usersRepo{
		Client:       client,
		DatabaseName: databaseName,
		NewrelicApp:  newrelicApp,
	}
}

type User struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	UserID     string             `bson:"user_id"`
	Email      string             `bson:"email"`
	Name       string             `bson:"name"`
	Picture    string             `bson:"picture"`
	GivenName  string             `bson:"given_name"`
	FamilyName string             `bson:"family_name"`
	Settings   Settings           `bson:"settings"`
	Hd         string             `bson:"hd"`
	LastLogin  time.Time          `bson:"last_login"`
	CreatedAt  time.Time          `bson:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at"`
}

type Settings struct {
	Theme  string `bson:"theme"`
	Locale string `bson:"locale"`
}

type GetFilter struct {
	UserID string `bson:"user_id"`
}

func (r *usersRepo) Get(ctx context.Context, userID string) (*User, error) {
	txn := r.NewrelicApp.StartTransaction("Mongo Get User")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	var user *User
	err := r.Client.Database(r.DatabaseName).Collection(db.USERS_COLLECTION).FindOne(ctx,
		GetFilter{
			UserID: userID,
		}).Decode(&user)
	if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
		slog.ErrorContext(ctx, "Error getting user", "error", err)
		return nil, err
	}

	return user, nil
}

func (r *usersRepo) Create(ctx context.Context, user model.UpdateUser) error {
	txn := r.NewrelicApp.StartTransaction("Mongo Create User")
	defer txn.End()

	ctx = newrelic.NewContext(ctx, txn)

	usersColection := r.Client.Database(r.DatabaseName).Collection(db.USERS_COLLECTION)
	_, err := usersColection.InsertOne(ctx, User{
		ID:         primitive.NewObjectID(),
		UserID:     user.UserID,
		Email:      user.Email,
		Name:       user.Name,
		Picture:    user.Picture,
		GivenName:  user.GivenName,
		FamilyName: user.FamilyName,
		Hd:         user.Hd,
		Settings:   Settings(*user.Settings),
		LastLogin:  time.Now(),
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	})
	if err != nil {
		slog.ErrorContext(ctx, "Error creating user", "error", err)
		return err
	}

	return nil
}

type UpdateSet struct {
	Email      string    `bson:"email"`
	Name       string    `bson:"name"`
	Picture    string    `bson:"picture"`
	GivenName  string    `bson:"given_name"`
	FamilyName string    `bson:"family_name"`
	Settings   Settings  `bson:"settings"`
	LastLogin  time.Time `bson:"last_login"`
}

func (r *usersRepo) Update(ctx context.Context, userID string, user model.UpdateUser) error {
	txn := r.NewrelicApp.StartTransaction("Mongo Update User")
	defer txn.End()

	lastLogin, err := parseISOTime(user.LastLogin)
	if err != nil {
		slog.ErrorContext(ctx, "Error parsing last login", "error", err)
		return err
	}

	usersCollection := r.Client.Database(r.DatabaseName).Collection(db.USERS_COLLECTION)
	_, err = usersCollection.UpdateOne(ctx,
		GetFilter{
			UserID: userID,
		},
		bson.M{
			db.SET: UpdateSet{
				Email:      user.Email,
				Name:       user.Name,
				Picture:    user.Picture,
				GivenName:  user.GivenName,
				FamilyName: user.FamilyName,
				Settings:   Settings(*user.Settings),
				LastLogin:  lastLogin,
			},
		},
	)
	if err != nil {
		slog.ErrorContext(ctx, "Error updating user", "error", err)
		return err
	}

	return nil
}

func parseISOTime(isoTimeStr string) (time.Time, error) {
	var parsedTime time.Time
	parsedTime, err := time.Parse("2006-01-02 15:04:05", isoTimeStr)
	if err != nil {
		return parsedTime, err
	}

	return parsedTime, nil
}

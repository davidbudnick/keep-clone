package notes_test

import (
	"context"
	"errors"
	"reflect"
	"server/graph/model"
	"server/internal/app/notes"
	repo_fakes "server/internal/app/notes/fakes"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func Test_notesService_List(t *testing.T) {
	type args struct {
		status string
		userID string
	}

	var ID = primitive.NewObjectID()

	tests := []struct {
		name  string
		args  args
		setup func(
			*repo_fakes.FakeNotesRepo,
		)
		want    []*model.Note
		wantErr bool
	}{
		{
			name: "should return notes",
			args: args{
				status: model.StatusActive.String(),
				userID: "user-id",
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.ListReturns([]notes.Note{
					{
						ID:        ID,
						UserID:    "user-id",
						Title:     "title",
						Body:      "body",
						Pinned:    false,
						Status:    model.StatusActive.String(),
						CreatedAt: time.Now(),
						UpdatedAt: time.Now(),
					},
				}, nil)
			},
			want: []*model.Note{
				{
					ID:        ID.Hex(),
					UserID:    "user-id",
					Title:     "title",
					Body:      "body",
					Pinned:    false,
					Status:    model.StatusActive.String(),
					CreatedAt: time.Now().Format("2006-01-02 15:04:05"),
					UpdatedAt: time.Now().Format("2006-01-02 15:04:05"),
				},
			},
			wantErr: false,
		},
		{
			name: "should return error",
			args: args{
				status: model.StatusActive.String(),
				userID: "user-id",
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.ListReturns(nil, errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &repo_fakes.FakeNotesRepo{}
			if tt.setup != nil {
				tt.setup(
					repo,
				)
			}

			got, err := notes.NewNotesService(repo).List(context.Background(), tt.args.status, tt.args.userID)
			if (err != nil) != tt.wantErr {
				t.Errorf("notesService.List() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("notesService.List() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_notesService_Get(t *testing.T) {
	type args struct {
		userID string
		noteID string
	}

	var ID = primitive.NewObjectID()

	tests := []struct {
		name  string
		args  args
		setup func(
			*repo_fakes.FakeNotesRepo,
		)
		want    *model.Note
		wantErr bool
	}{
		{
			name: "should return note",
			args: args{
				userID: "user-id",
				noteID: "note-id",
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.GetReturns(&notes.Note{
					ID:        ID,
					UserID:    "user-id",
					Title:     "title",
					Body:      "body",
					Pinned:    true,
					Status:    model.StatusActive.String(),
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}, nil)
			},
			want: &model.Note{
				ID:        ID.Hex(),
				UserID:    "user-id",
				Title:     "title",
				Body:      "body",
				Pinned:    true,
				Status:    model.StatusActive.String(),
				CreatedAt: time.Now().Format("2006-01-02 15:04:05"),
				UpdatedAt: time.Now().Format("2006-01-02 15:04:05"),
			},
			wantErr: false,
		},
		{
			name: "should return error",
			args: args{
				userID: "user-id",
				noteID: "note-id",
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.GetReturns(nil, errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &repo_fakes.FakeNotesRepo{}
			if tt.setup != nil {
				tt.setup(
					repo,
				)
			}

			got, err := notes.NewNotesService(repo).Get(context.Background(), tt.args.userID, tt.args.noteID)
			if (err != nil) != tt.wantErr {
				t.Errorf("notesService.Get() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("notesService.Get() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_notesService_Create(t *testing.T) {
	type args struct {
		userID string
		note   model.NewNote
	}

	var ID = primitive.NewObjectID()

	tests := []struct {
		name  string
		setup func(
			*repo_fakes.FakeNotesRepo,
		)
		args    args
		want    *model.Note
		wantErr bool
	}{
		{
			name: "should return note",
			args: args{
				userID: "user-id",
				note: model.NewNote{
					Title:  "title",
					Body:   "body",
					Pinned: true,
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.CreateReturns(&mongo.InsertOneResult{
					InsertedID: ID,
				}, nil)
				repo.GetReturns(&notes.Note{
					ID:        ID,
					UserID:    "user-id",
					Title:     "title",
					Body:      "body",
					Pinned:    true,
					Status:    model.StatusActive.String(),
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}, nil)
			},
			want: &model.Note{
				ID:        ID.Hex(),
				UserID:    "user-id",
				Title:     "title",
				Body:      "body",
				Pinned:    true,
				Status:    model.StatusActive.String(),
				CreatedAt: time.Now().Format("2006-01-02 15:04:05"),
				UpdatedAt: time.Now().Format("2006-01-02 15:04:05"),
			},
			wantErr: false,
		},
		{
			name: "should repo create return error",
			args: args{
				userID: "user-id",
				note: model.NewNote{
					Title:  "title",
					Body:   "body",
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.CreateReturns(nil, errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "should repo get return error",
			args: args{
				userID: "user-id",
				note: model.NewNote{
					Title:  "title",
					Body:   "body",
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.CreateReturns(&mongo.InsertOneResult{
					InsertedID: ID,
				}, nil)
				repo.GetReturns(nil, errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &repo_fakes.FakeNotesRepo{}
			if tt.setup != nil {
				tt.setup(
					repo,
				)
			}

			got, err := notes.NewNotesService(repo).Create(context.Background(), tt.args.userID, tt.args.note)
			if (err != nil) != tt.wantErr {
				t.Errorf("notesService.Create() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("notesService.Create() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_notesService_Update(t *testing.T) {
	type args struct {
		userID string
		note   model.UpdateNote
	}

	var ID = primitive.NewObjectID()

	tests := []struct {
		name  string
		args  args
		setup func(
			*repo_fakes.FakeNotesRepo,
		)
		want    *model.Note
		wantErr bool
	}{
		{
			name: "should return note",
			args: args{
				userID: "user-id",
				note: model.UpdateNote{
					ID:     "note-id",
					Title:  "title",
					Body:   "body",
					Pinned: true,
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.UpdateReturns(nil)
				repo.GetReturns(&notes.Note{
					ID:        ID,
					UserID:    "user-id",
					Title:     "title",
					Body:      "body",
					Pinned:    true,
					Status:    model.StatusActive.String(),
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}, nil)
			},
			want: &model.Note{
				ID:        ID.Hex(),
				UserID:    "user-id",
				Title:     "title",
				Body:      "body",
				Pinned:    true,
				Status:    model.StatusActive.String(),
				CreatedAt: time.Now().Format("2006-01-02 15:04:05"),
				UpdatedAt: time.Now().Format("2006-01-02 15:04:05"),
			},
			wantErr: false,
		},
		{
			name: "should repo update return error",
			args: args{
				userID: "user-id",
				note: model.UpdateNote{
					ID:     "note-id",
					Title:  "title",
					Body:   "body",
					Pinned: true,
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.UpdateReturns(errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "should repo get return error",
			args: args{
				userID: "user-id",
				note: model.UpdateNote{
					ID:     "note-id",
					Title:  "title",
					Body:   "body",
					Pinned: true,
					Status: model.StatusActive.String(),
				},
			},
			setup: func(
				repo *repo_fakes.FakeNotesRepo,
			) {
				repo.UpdateReturns(nil)
				repo.GetReturns(nil, errors.New("error"))
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &repo_fakes.FakeNotesRepo{}
			if tt.setup != nil {
				tt.setup(
					repo,
				)
			}

			got, err := notes.NewNotesService(repo).Update(context.Background(), tt.args.userID, tt.args.note)
			if (err != nil) != tt.wantErr {
				t.Errorf("notesService.Update() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("notesService.Update() = %v, want %v", got, tt.want)
			}
		})
	}
}

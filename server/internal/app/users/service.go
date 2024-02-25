package users

import (
	"context"
	"server/graph/model"
)

//go:generate counterfeiter -o fakes/fake_users_service.go . UsersService
type UsersService interface {
	Get(ctx context.Context, userID string) (*model.User, error)
	Update(ctx context.Context, userID string, user model.UpdateUser) error
}

type usersService struct {
	repo UsersRepo
}

func NewUsersService(repo UsersRepo) UsersService {
	return &usersService{
		repo: repo,
	}
}

func (s *usersService) Get(ctx context.Context, userID string) (*model.User, error) {
	user, err := s.repo.Get(ctx, userID)
	if err != nil {
		return nil, err
	}

	return &model.User{
		ID:         user.ID.Hex(),
		UserID:     user.UserID,
		Email:      user.Email,
		Name:       user.Name,
		Picture:    user.Picture,
		GivenName:  user.GivenName,
		FamilyName: user.FamilyName,
		Hd:         user.Hd,
		Settings: &model.Settings{
			Theme:  user.Settings.Theme,
			Locale: user.Settings.Locale,
		},
		LastLogin: user.LastLogin.Format("2006-01-02 15:04:05"),
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}

func (s *usersService) Update(ctx context.Context, userID string, user model.UpdateUser) error {
	u, err := s.repo.Get(ctx, userID)
	if err != nil {
		return err
	}

	if u == nil {
		err := s.repo.Create(ctx, user)
		if err != nil {
			return err
		}
	} else {
		err := s.repo.Update(ctx, userID, user)
		if err != nil {
			return err
		}
	}

	return nil
}

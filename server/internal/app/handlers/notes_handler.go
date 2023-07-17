package handlers

import (
	"server/internal/app/notes"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/exp/slog"
)

const NOTES = "notes"

const (
	LIST          = "list"
	LIST_ARCHIVED = "list/archived"
	LIST_DELETED  = "list/deleted"
	GET           = "get/:id"
	SAVE          = "save"
	DELETE        = "delete/:id"
	UPDATE        = "update/:id"
)

const (
	X_USER_ID = "X-User-Id"
)

type HandlerService interface {
	List(ctx *gin.Context)
	ListArchived(ctx *gin.Context)
	ListDeleted(ctx *gin.Context)
	Get(ctx *gin.Context)
	Save(ctx *gin.Context)
	Update(ctx *gin.Context)
}

type handlerService struct {
	notesService notes.NotesService
}

func NewHandlerService(notesService notes.NotesService) HandlerService {
	return &handlerService{
		notesService: notesService,
	}
}

func (h *handlerService) List(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	notes, err := h.notesService.List(ctx, userID)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error listing notes",
		})
		return
	}

	ctx.JSON(200, notes)
}

func (h *handlerService) ListArchived(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	notes, err := h.notesService.ListArchived(ctx, userID)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error listing archived notes",
		})
		return
	}

	ctx.JSON(200, notes)
}

func (h *handlerService) ListDeleted(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	notes, err := h.notesService.ListDeleted(ctx, userID)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error listing deleted notes",
		})
		return
	}

	ctx.JSON(200, notes)
}

func (h *handlerService) Get(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	note, err := h.notesService.Get(ctx, userID, id)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error getting note",
		})
		return
	}

	ctx.JSON(200, note)
}

type SaveRequest struct {
	Title  string `json:"title" validate:"required"`
	Body   string `json:"body" validate:"required"`
	Status string `json:"status" validate:"required"`
}

func (h *handlerService) Save(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	var request SaveRequest
	err := ctx.BindJSON(&request)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	validate := validator.New()
	if err := validate.Struct(request); err != nil {
		ctx.JSON(400, gin.H{
			"error":   "Validation failed.",
			"details": err.Error(),
		})
		return
	}

	err = h.notesService.Save(ctx, &notes.Note{
		UserID:    userID,
		Title:     request.Title,
		Body:      request.Body,
		Status:    request.Status,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	})
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error saving note",
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "saved",
	})
}

type UpdateRequest struct {
	Title  string `json:"title" validate:"required"`
	Body   string `json:"body" validate:"required"`
	Status string `json:"status" validate:"required"`
}

func (h *handlerService) Update(ctx *gin.Context) {
	userID := ctx.GetHeader(X_USER_ID)
	if userID == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	var request UpdateRequest
	err := ctx.BindJSON(&request)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	validate := validator.New()
	if err := validate.Struct(request); err != nil {
		ctx.JSON(400, gin.H{
			"error":   "Validation failed.",
			"details": err.Error(),
		})
		return
	}

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		slog.ErrorContext(ctx, "Error decoding NoteID", "error", err)
		ctx.JSON(400, gin.H{
			"message": "invalid request",
		})
	}

	err = h.notesService.Update(ctx, &notes.Note{
		ID:        objectId,
		UserID:    userID,
		Title:     request.Title,
		Body:      request.Body,
		Status:    request.Status,
		UpdatedAt: time.Now().UTC(),
	})
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "error updating note",
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "updated",
	})
}

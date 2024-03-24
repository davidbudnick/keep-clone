package handlers

import "github.com/gin-gonic/gin"

type HealthResponse struct {
	Status string `json:"status"`
}

const (
	OK = "ok"
)

func Register(endpoint string, r *gin.Engine) {
	r.GET(endpoint, func(c *gin.Context) {
		c.JSON(200, HealthResponse{Status: OK})
	})
}

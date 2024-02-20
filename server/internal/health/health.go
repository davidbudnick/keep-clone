package health

import "github.com/gin-gonic/gin"

const (
	INTERNAL_ENDPOINT = "/health"
	EXTERNAL_ENDPOINT = "/api/health"
)

func Register(endpoint string, r *gin.Engine) {
	r.GET(endpoint, func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}

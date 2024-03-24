package handlers

import "github.com/gin-gonic/gin"

func Register(endpoint string, r *gin.Engine) {
	r.GET(endpoint, func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}

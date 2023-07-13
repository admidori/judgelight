package database

import "github.com/gin-gonic/gin"

func ReadDB(c *gin.Context) {
	paramID := c.Query("id")
	paramProblemNum := c.Query("problemNum")

	InitDatabase()
	
}

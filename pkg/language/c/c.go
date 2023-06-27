package c

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReceiveSubmitProgram(c *gin.Context) {
	s := c.PostForm("program")
	message := fmt.Sprintf("%v", s)
	fmt.Print(message)

	// Exec C language program using "message"

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
}

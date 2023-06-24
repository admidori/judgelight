/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.POST("", func(c *gin.Context) {
		s := c.PostForm("program")
		message := fmt.Sprintf("%v", s)
		fmt.Print(message)
	})
	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080")
}

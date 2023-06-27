/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

/*
Function: This is judge server for judgelight.
		  Receive json from API server on backend.
		  And run docker container after exec C program.
		  Finally, send status data to API server and down container.
*/

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/language/c"
)

func main() {
	router := gin.Default()
	router.POST("/program/c", c.ReceiveSubmitProgram)

	router.Run(":1000")
}

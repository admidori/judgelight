/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

/*
Function: This is backend program for judgelight.
		  Receive "Submit datafile" from axios on React(Next.js).
		  And send a json file to judge-language server.
*/

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/controller/submit"
)

func main() {
	router := gin.Default()
	router.POST("/program/submit", submit.ReceiveSubmitProgram)

	router.Run(":8080")
}

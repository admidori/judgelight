/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
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

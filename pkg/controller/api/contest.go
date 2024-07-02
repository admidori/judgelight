package api

import (
	"net/http"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

func GetContestInfo(c *gin.Context) {
	contest := database.ReadContest()

	c.JSON(http.StatusOK, gin.H{
		"title":      contest.Title,
		"startTime": contest.Start_time,
		"endTime":   contest.End_time,
	})
}

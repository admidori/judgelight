package api

import (
	"net/http"
	"strconv"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

func GetProblemInfo(c *gin.Context) {
	problem := database.ReadProblem()

	num := c.Query("problemNumber")
	p, _ := strconv.Atoi(num)
	p--

	param := c.Query("parameter")

	if param == "NumberOfProblem" {
		c.JSON(http.StatusOK, gin.H{
			"parameter": len(problem),
		})
	}
	if param == "Title" {
		c.JSON(http.StatusOK, gin.H{
			"title":         problem[p].ProblemTitle,
			"problemNumber": problem[p].ProblemNum,
		})
	}
	if param == "Description" {
		c.JSON(http.StatusOK, gin.H{
			"description": problem[p].ProblemDescription,
		})
	}
	if param == "Appendix" {
		c.JSON(http.StatusOK, gin.H{
			"score":       problem[p].ProblemScore,
			"limitTime":   problem[p].ProblemLimitTime,
			"limitMemory": problem[p].ProblemLimitMemory,
		})
	}
	if param == "Limitation" {
		c.JSON(http.StatusOK, gin.H{
			"input":  problem[p].ProblemLimitationInput,
			"output": problem[p].ProblemLimitationOutput,
		})
	}
	if param == "CaseTotalNumber" {
		c.JSON(http.StatusOK, gin.H{
			"totalNumber": len(problem[p].TestCase),
		})
	}
	if param == "TestCase" {
		total := len(problem[p].TestCase)
		TestCaseInput := make([]string, total)
		TestCaseOutput := make([]string, total)

		for i := 0; i < total; i++ {
			TestCaseInput[i] = problem[p].TestCase[i].Input
			TestCaseOutput[i] = problem[p].SecretCase[i].Output
		}

		c.JSON(http.StatusOK, gin.H{
			"testCaseInputData":  TestCaseInput,
			"testCaseOutputData": TestCaseOutput,
		})
	}
	if param == "InitialCode" {
		c.JSON(http.StatusOK, gin.H{
			"initialCode": problem[p].ProblemInitialCode,
		})
	}
}

func SendProblem(c *gin.Context) {
	problem := database.ReadProblem()

	param := c.Query("ProblemNumber")
	p, _ := strconv.Atoi(param)
	p--
	total := len(problem[p].TestCase)

	TestCaseInput := make([]string, total)
	TestCaseOutput := make([]string, total)

	for i := 0; i < total; i++ {
		TestCaseInput[i] = problem[p].TestCase[i].Input
		TestCaseOutput[i] = problem[p].SecretCase[i].Output
	}

	c.JSON(http.StatusOK, gin.H{
		"problem":             problem[p].ProblemDescription,
		"testCaseTotalNumber": total,
		"testCaseInputData":   TestCaseInput,
		"testCaseOutputData":  TestCaseOutput,
	})
}

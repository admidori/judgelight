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

	if param != "NumberOfProblem" && param != "ScoreAll" {
		if p < 0 || p >= len(problem) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid problemNumber"})
			return
		}
	}

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
		total := len(problem[p].ProblemLimitationDescription)
		description := make([]string, total)

		for i := 0; i < total; i++ {
			description[i] = problem[p].ProblemLimitationDescription[i].Description
		}

		c.JSON(http.StatusOK, gin.H{
			"description": description,
			"input":       problem[p].ProblemLimitationInput,
			"output":      problem[p].ProblemLimitationOutput,
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
		TestCaseDescription := make([]string, total)

		for i := 0; i < total; i++ {
			TestCaseInput[i] = problem[p].TestCase[i].Input
			TestCaseOutput[i] = problem[p].TestCase[i].Output
			TestCaseDescription[i] = problem[p].TestCase[i].Description
		}

		c.JSON(http.StatusOK, gin.H{
			"testCaseInputData":   TestCaseInput,
			"testCaseOutputData":  TestCaseOutput,
			"testCaseDescription": TestCaseDescription,
		})
	}
	if param == "InitialCode" {
		c.JSON(http.StatusOK, gin.H{
			"initialCode": problem[p].ProblemInitialCode,
		})
	}
	if param == "ScoreAll" {
		total := len(problem)
		score := make([]int, total)

		for i := 0; i < total; i++ {
			score[i] = problem[i].ProblemScore
		}
		c.JSON(http.StatusOK, gin.H{
			"score": score,
		})
	}
	if param == "Case" {
		totalTest := len(problem[p].TestCase)
		totalSecret := len(problem[p].SecretCase)

		TestCaseInput := make([]string, totalTest)
		TestCaseOutput := make([]string, totalTest)
		SecretCaseInput := make([]string, totalSecret)
		SecretCaseOutput := make([]string, totalSecret)

		for i := 0; i < totalTest; i++ {
			TestCaseInput[i] = problem[p].TestCase[i].Input
			TestCaseOutput[i] = problem[p].TestCase[i].Output
		}
		for i := 0; i < totalSecret; i++ {
			SecretCaseInput[i] = problem[p].SecretCase[i].Input
			SecretCaseOutput[i] = problem[p].SecretCase[i].Output
		}

		c.JSON(http.StatusOK, gin.H{
			"testCaseInputData":    TestCaseInput,
			"testCaseOutputData":   TestCaseOutput,
			"secretCaseInputData":  SecretCaseInput,
			"secretCaseOutputData": SecretCaseOutput,
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

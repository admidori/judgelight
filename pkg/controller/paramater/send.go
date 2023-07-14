package paramater

import (
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/settings"
)

func StructToMap(data interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	elem := reflect.ValueOf(data).Elem()
	size := elem.NumField()

	for i := 0; i < size; i++ {
		field := elem.Type().Field(i).Name
		value := elem.Field(i).Interface()
		result[field] = value
	}

	return result
}

func SendParamater(c *gin.Context) {
	var schema settings.SettingParamater

	settings.UnmarshalYAML(&schema)
	param := c.Query("paramater")
	m := StructToMap(&schema)
	sendData := m[param]
	c.JSON(http.StatusOK, gin.H{
		"paramater": sendData,
	})
}

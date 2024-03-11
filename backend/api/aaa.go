package api

import (
	"net/http"
	"github.com/labstack/echo/v4"
)

func Aaa(c echo.Context) error {
	return c.String(http.StatusOK, "AAAAA")
}

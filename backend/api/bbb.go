package api

import (
	"net/http"
	"database/sql"
	"fmt" // fmtパッケージのインポートを追加
	// "os"  // osパッケージのインポートを追加

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

type EMPLOYEE struct {
    ID     string
    NUMBER string
}

func Bbb(c echo.Context) error {
	// db_url, ok := os.LookupEnv("DATABASE_URL")
	// if !ok {
	// 	return c.String(http.StatusOK, ".envにDATABASE_URLを設定してね")
	// }
	// db_url =

	db, err := sql.Open("postgres", "postgres://user:password@localhost:5432/aptitude-quiz-master?sslmode=disable")
	defer db.Close()

	if err != nil {
		// データベース接続エラーをログに出力
		fmt.Println(err)
        // エラーレスポンスの返却
		return c.String(http.StatusInternalServerError, "データベース接続に失敗しました")
	}

	var empID string
	id := 3
	username := "なまえ"
	email := "aaa@example.com"
	password := "password"
	err = db.QueryRow("INSERT INTO users(id, username, email, password) VALUES($1,$2, $3, $4) RETURNING id", id, username, email, password).Scan(&empID)
	if err != nil {
		fmt.Println(err)
		return c.String(http.StatusInternalServerError, "データの挿入に失敗しました")
	}

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		fmt.Println(err)
        return c.String(http.StatusInternalServerError, "データの取得に失敗しました")
	}

	var es []EMPLOYEE
	for rows.Next() {
		var e EMPLOYEE
		rows.Scan(&e.ID, &e.NUMBER)
		es = append(es, e)
	}

	if len(es) > 0 {
		return c.JSON(http.StatusOK, es[0])
	} else {
		return c.String(http.StatusOK, "データが存在しません")
	}
}

package main

// HTTPサーバを構築する
// フロントを実装する
// APIを実装する

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", Receive_proggram)
	http.ListenAndServe(":8080", nil)
}

func Receive_proggram(w http.ResponseWriter, r *http.Request) {
	fmt.Println("program=", r.FormValue("program"))
}

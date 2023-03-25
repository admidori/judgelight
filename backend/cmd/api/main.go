package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Status: Ready to liten")
	http.HandleFunc("/", Receive_program)
	http.ListenAndServe(":8080", nil)
}

func Send_program_docker()

// Todo: Select language
func Receive_program(w http.ResponseWriter, r *http.Request) {
	e := r.ParseForm()
	if e != nil {
		fmt.Println("Error")
		return
	}
	fmt.Println("program=", r.FormValue("program"))
}

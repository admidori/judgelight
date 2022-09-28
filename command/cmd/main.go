package main

import (
	"fmt"
	"os"
	""
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("jl")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "start":
		fmt.Println("jl start")
		pkg.Init_build()
		pkg.Start_server()
		
	case "help":
		
	default:
		os.Exit(1)
	}
}

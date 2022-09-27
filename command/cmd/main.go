package main

import (
	"fmt"
	"os"
	"server/command/pkg"
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
		fmt.Println("'Judgelight' is competitive-programming providing service.")
		fmt.Println("")
		fmt.Println("Usage:")
		fmt.Println("jl <command> [arguments]")
		fmt.Println("")
		fmt.Println("The commands are:")
		fmt.Println("start")
		fmt.Println("help")
		os.Exit(0)
	default:
		os.Exit(1)
	}
}

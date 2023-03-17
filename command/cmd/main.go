package main

import (
	"fmt"
	"os"

	"github.com/rp-agota/judgelight/command/pkg/help"
	"github.com/rp-agota/judgelight/command/pkg/start"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("jl")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "start":
		start.Command_start()
	case "help":
		help.Command_help()
	default:
		os.Exit(1)
	}
}

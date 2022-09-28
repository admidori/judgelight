package help

import (
	"fmt"
	"os"
)

func Command_help() {
	fmt.Println("'Judgelight' is competitive-programming providing service.")
	fmt.Println("")
	fmt.Println("Usage:")
	fmt.Println("jl <command> [arguments]")
	fmt.Println("")
	fmt.Println("The commands are:")
	fmt.Println("start")
	fmt.Println("help")
	os.Exit(0)
}

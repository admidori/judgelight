package start

import (
	"fmt"
	"http/net"
	"net/http"
	"os"
)

func Command_start() {
	http.ListenAndServe()

}

import React from "react";
import { createTheme, ThemeProvider, AppBar, Box, Toolbar, Typography, Container } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default function Appendix(props){
    const theme = createTheme({
        palette: {
            primary: green,
            secondary: {
                main: '#689f38',
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <pre style={{
                        borderRadius: 5,
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        border: "dotted 1px #7f7f7f",
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                        padding: "5px",
                    }}>
                    実行制限時間:{props.problemAppendix.limitTime}sec&#009;/&#009;メモリ制限:{props.problemAppendix.limitMemory}MB<br></br>
                    配点: {props.problemAppendix.score}
                </pre>
            </Container>
        </ThemeProvider>
    )
}

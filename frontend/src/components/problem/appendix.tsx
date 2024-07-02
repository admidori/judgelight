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
                    Score: {props.problemAppendix.score}&#009;Time Limit: {props.problemAppendix.limitTime}&#009;Memory Limit: {props.problemAppendix.limitMemory}
                </pre>
            </Container>
        </ThemeProvider>
    )
}

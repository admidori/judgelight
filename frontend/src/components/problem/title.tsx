import { createTheme, ThemeProvider, AppBar, Toolbar, Typography, Box, Container } from "@material-ui/core";
import React from "react";
import { green } from "@material-ui/core/colors";

export default function Title(props){
    const theme = createTheme({
        palette: {
            primary: green,
            secondary: {
                main: '#689f38',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <h1>{props.problemTitle.problemNumber}. {props.problemTitle.title}</h1>
            </Container>
        </ThemeProvider>
    );
}

import { createTheme, Container } from "@material-ui/core";
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
        <Container maxWidth="md">
            <h1>{props.problemTitle.problemNumber}. {props.problemTitle.title}</h1>
        </Container>
    );
}

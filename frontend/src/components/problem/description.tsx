import React from "react";
import { AppBar, Box, Container, Toolbar } from "@material-ui/core";

export default function Description(props){
    return (
        <Container maxWidth="md">
            <p style={{
                fontSize: 20,
                fontWeight: "bold",
                }}>問題</p>
            <p style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                border: "#000000",
                borderStyle: "solid",
                borderWidth: "1px",
                fontSize: "100%",
                padding: "20px"
                }}>{props.problemDescription}</p>
        </Container>
    );
}

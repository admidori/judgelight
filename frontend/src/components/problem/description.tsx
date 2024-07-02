import React from "react";
import { AppBar, Box, Container, Toolbar } from "@material-ui/core";

export default function Description(props){
    return (
        <Container maxWidth="md">
            <div style={{border: "#000000", borderStyle: "solid", borderWidth: "1px", fontSize: "100%", padding: "20px"}}>{props.problemDescription}</div>
        </Container>
    );
}

import React from "react";
import { AppBar, Box, Toolbar } from "@material-ui/core";

export default function Description(props){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <p style={{fontSize: 15}}>{props.problemDescription}</p>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

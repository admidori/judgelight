import { createTheme, ThemeProvider, AppBar, Toolbar, Typography, Box } from "@material-ui/core";
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
            <AppBar position="static" color="secondary">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Box border={1}>{props.problemTitle.problemNumber}</Box>
                        <Typography variant="h6" component="div">
                            {props.problemTitle.title}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

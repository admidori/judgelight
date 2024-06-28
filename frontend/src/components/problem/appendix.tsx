import React from "react";
import { createTheme, ThemeProvider, AppBar, Box, Toolbar, Typography } from "@material-ui/core";
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
            <AppBar position="static" color="secondary">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="h6" component="div">
                            Score: {props.problemAppendix.score}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Time Limit: {props.problemAppendix.limitTime}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Memory Limit: {props.problemAppendix.limitMemory}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

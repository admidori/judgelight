import React from "react";
import { AppBar, Box, Toolbar, Button , createTheme, ThemeProvider, ButtonGroup} from "@material-ui/core";
import { lightBlue, blue, indigo } from "@material-ui/core/colors";
import { NodeNextRequest } from "next/dist/server/base-http/node";

export default function Menu(props){
    const handleClick = (num) => {
        props.handleNowProblemChange(num)
    }

    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: blue,
        },
    });

    return(
        <ThemeProvider theme={theme}>
                <AppBar position="static" color="secondary">
                    <Toolbar disableGutters>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            overflow: 'auto',
                            width: '100%',
                        }}>
                            <ButtonGroup>
                                {
                                (function () {
                                    const list = [];
                                    for (let i = 1; i <= Number(props.problemTotal); i++) {
                                        if(i%10 === 0){
                                            list.push(<br/>);
                                        }
                                        list.push(
                                            <Button
                                                variant="outlined"
                                                style={{
                                                    margin: '2px',
                                                    color: 'white',
                                                    borderColor: 'white',
                                                    display: 'block', 
                                                }}
                                                onClick={() => handleClick(i)}
                                            >
                                                {i}
                                            </Button>
                                        );
                                    }
                                    return <>{list}</>;
                                }())
                                }
                            </ButtonGroup>
                        </Box>
                    </Toolbar>
                </AppBar>
        </ThemeProvider>
    );
}

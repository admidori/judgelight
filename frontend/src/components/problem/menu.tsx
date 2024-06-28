import React from "react";
import { AppBar, Box, Toolbar, Button , createTheme, ThemeProvider, ButtonGroup} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default function Menu(props){
    const handleClick = (num) => {
        props.handleNowProblemChange(num)
    }

    const theme = createTheme({
        palette: {
            primary: green,
            secondary: {
                main: '#689f38',
            },
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
                        }}>
                            <ButtonGroup>
                                {
                                (function () {
                                    const list = [];
                                    for (let i = 1; i <= Number(props.problemTotal); i++) {
                                        list.push(<Button  style={{ margin: '2px', color: 'white', display: 'block' , borderColor: 'white'}} onClick= {() => handleClick(i)}>{i}</Button>);
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

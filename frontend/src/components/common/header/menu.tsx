import { AppBar, Container, Toolbar, Box , Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import Link from "next/link";
import { LoginContext } from "../../../provider/auth";

export default function Menu() {
    const isLoggedIn = React.useContext(LoginContext);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <ButtonGroup>
                            <Link href="/problem">
                                <Button
                                    style={{ margin: '10px', color: 'white', display: 'block' , borderColor: 'white'}}
                                >
                                    PROBLEMS
                                </Button>
                            </Link>
                            <Link href="/result">
                                <Button
                                    disabled={!isLoggedIn}
                                    style={{
                                        margin: '10px',
                                        color: isLoggedIn ? 'white' : 'gray',
                                        display: 'block',
                                        borderColor: 'white'
                                    }}
                                >
                                    RESULT
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

import { AppBar, Container, Toolbar, Typography, Box , Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ButtonGroup>
                                    <Link href="/problem">
                                    <Button
                                        style={{ margin: '10px', color: 'white', display: 'block' , borderColor: 'white'}}
                                    >
                                        PROBLEMSET
                                    </Button>
                                    </Link>
                                    <Link href="/result">
                                    <Button
                                        style={{ margin: '10px', color: 'white', display: 'block' , borderColor: 'white'}}
                                    >
                                        RESULT
                                    </Button>
                                    </Link>
                            </ButtonGroup>
                        </Box>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

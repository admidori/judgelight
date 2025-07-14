import axios from "axios";
import React from "react";
import { baseURL } from "../../../pages";
import { AppBar, Container, Toolbar, Box } from "@material-ui/core";

export default function ContestTitle() {
    const [contestTitle, setContestTitle] = React.useState<string>("")
    const [contestStartTime, setContestStartTime] = React.useState<string>("")
    const [contestEndTime, setContestEndTime] = React.useState<string>("")

    React.useEffect(() => {
        axios.get(baseURL+"/get/contest/info")
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            setContestTitle(responseJsonData.data.title)
            setContestStartTime(responseJsonData.data.startTime)
            setContestEndTime(responseJsonData.data.endTime)
        })
        .catch(function(error){
            console.log(error)
        })
    }, [])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <h2 style={{ margin: 0 }}>{contestTitle}</h2>
                        <pre style={{
                            borderRadius: 5,
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            textAlign: "right",
                            margin: 0,
                        }}>
                            開始時刻:{contestStartTime} &#009; 終了時刻:{contestEndTime}
                        </pre>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

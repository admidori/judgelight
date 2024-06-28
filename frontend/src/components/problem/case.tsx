import React from "react";
import { AppBar, Box, Toolbar } from "@material-ui/core";

export default function Case(props){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {
                        (function () {
                            const list = [];
                            for (let i = 0; i < Number(props.problemCaseTotalNumber); i++) {
                                list.push(<hr></hr>)
                                list.push(<p style={{fontSize: 12}}>入力例{i+1}</p>)
                                list.push(<p style={{fontFamily: '"Fira code", "Fira Mono", monospace',fontSize: 12,}}>{props.problemCase.input[i]}</p>)
                                list.push(<p style={{fontSize: 12}}>出力例{i+1}</p>)
                                list.push(<p style={{fontFamily: '"Fira code", "Fira Mono", monospace',fontSize: 12,}}>{props.problemCase.output[i]}</p>)
                            }
                            return <p>{list}</p>;
                        }())
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

import React from "react";
import { AppBar, Box, Container, Toolbar } from "@material-ui/core";

export default function Case(props){
    return (
        <Container maxWidth="xs">
            {
                (function () {
                    const list = [];
                    for (let i = 0; i < Number(props.problemCaseTotalNumber); i++) {
                        list.push(<hr></hr>)
                        list.push(<p style={{
                            fontSize: 20,
                            fontWeight: "bold",
                        }}>入力例{i+1}</p>)
                        list.push(<p style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            background: "#f0f0f0",
                            borderLeft: "solid 5px #7f7f7f",
                            border: "solid 1px #7f7f7f",
                            padding: "5px",
                        }}>{props.problemCase.input[i]}</p>)
                        list.push(<p style={{
                            fontSize: 20,
                            fontWeight: "bold",
                        }}>出力例{i+1}</p>)
                        list.push(<p style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            background: "#f0f0f0",
                            borderLeft: "solid 5px #7f7f7f",
                            border: "solid 1px #7f7f7f",
                            padding: "5px",
                        }}>{props.problemCase.output[i]}</p>)
                        list.push(<p>{props.problemCase.description[i]}</p>)
                    }
                    return <p>{list}</p>;
                }())
            }
        </Container>
    );
}

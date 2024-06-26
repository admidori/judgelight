import React from "react";
import { Container } from "@material-ui/core";

export default function CaseLimitation(props){
    return (
            <Container maxWidth="xs">
                <p style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    }}>入力</p>
                <p>入力は以下の形式で標準入力から与えられる</p>
                    <p style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            background: "#f0f0f0",
                            borderLeft: "solid 5px #7f7f7f",
                            border: "solid 1px #7f7f7f",
                            padding: "5px",
                        }}>{props.problemLimitation.input}</p>
                <p style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    }}>出力</p>
                <p>結果は以下の形式で標準入力より出力せよ</p>
                    <p style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 16,
                            background: "#f0f0f0",
                            borderLeft: "solid 5px #7f7f7f",
                            border: "solid 1px #7f7f7f",
                            padding: "5px",
                        }}>{props.problemLimitation.output}</p>
            </Container>
    )
}

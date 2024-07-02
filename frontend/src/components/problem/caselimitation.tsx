import React from "react";
import { Container } from "@material-ui/core";

export default function CaseLimitation(props){
    return (
            <Container maxWidth="xs">
                    {
                        (function() {
                            if (props.problemLimitation.description.length === 0) {
                                return <div></div>;
                            }else{
                                const list = [];
                                list.push(<p style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    }}>制約</p>)
                                list.push(<p>入力に関する制約は以下の通りである</p>)
                            for (let i = 0; i < props.problemLimitation.description.length; i++) {
                                list.push(<li>{props.problemLimitation.description[i]}</li>)
                            }
                            return <ul>{list}</ul>;
                        }
                    }())}
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
                    <p>{props.problemLimitation.output}</p>
            </Container>
    )
}

import React from "react";
import { Container } from "@material-ui/core";
import { handleGetResult } from "./hooks";

export default function Database(){
    const { databaseResult, problemTotalNumber } = handleGetResult()
    return(
        <Container maxWidth="xs">
            {
                (() => {
                    const list = [];
                    for (let i = 0; i < problemTotalNumber; i++) {
                        list.push(<p style={{
                            fontSize: 20,
                            fontWeight: "bold",
                        }}>問題{i+1}</p>)
                        if (databaseResult.result[i] == "0"){
                            list.push(<p style={{
                                fontSize: 16,
                            }}>正解</p>)
                        }else {
                            list.push(<p style={{
                                fontSize: 16,
                            }}>未提出または不正解</p>)
                        }
                    }
                    return list;
                })()
            }
        </Container>
    );
}

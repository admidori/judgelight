import { Container } from "@material-ui/core";
import React from "react";
import { handleGetScore, handleGetResult } from "./hooks";

export default function Score(){
    const { databaseResult, problemTotalNumber } = handleGetResult()
    const { score } = handleGetScore()
    const [scoreSum, SetScoreSum] = React.useState(0)
    console.log(score)
    React.useEffect(() => {
        for (let i = 0; i < score.length; i++) {
            if (databaseResult.result[i] == "0"){
                SetScoreSum(scoreSum + score[i])
                console.log(scoreSum)
            }
        }
    },[score])
    return(
        <Container maxWidth="xs">
            <p style={{
                fontSize: 20,
                fontWeight: "bold",
            }}>合計得点:{scoreSum}</p>
        </Container>
    )
}

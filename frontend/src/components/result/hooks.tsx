import React, { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../pages";
import { handleGetProblemTotalNumber } from "../problem/hooks";

export const handleGetResult = () => {
    const [databaseResult, SetDatabaseResult] = React.useState({
        result: "",
    })
    const problemTotalNumber = handleGetProblemTotalNumber()

    React.useEffect(() => {
        axios.get(baseURL+"/database/result", {
                params: {
                    "studentId": JSON.parse(localStorage.getItem("authInfo")).userId,
                }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpDatabaseResult = {
                result: responseJsonData.data.result,
            }
            SetDatabaseResult(tmpDatabaseResult)
        })
        .catch(function(error){
            console.log(error)
        })
    },[]);

    return { databaseResult, problemTotalNumber }
}

export const handleGetScore = () => {
    const [score, SetScore] = React.useState([])

    useEffect(() => {
        axios.get(baseURL+"/get/problem/info", {
            params: {
                "parameter": "ScoreAll",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpScore = (responseJsonData.data.score)
            SetScore(tmpScore)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])

    return { score }
}

import React from "react";
import axios from "axios";
import { baseURL } from "../../pages";

export const handleGetResult = () => {
    const [databaseResult, SetDatabaseResult] = React.useState({
        result: "",
    })
    const [problemTotalNumber, SetProblemTotalNumber] = React.useState(0)

    React.useEffect(() => {
        axios.get(baseURL+"/database", {
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
            SetProblemTotalNumber(responseJsonData.data.totalNum)
        })
        .catch(function(error){
            console.log(error)
        })
    },[]);

    return { databaseResult, problemTotalNumber }
}

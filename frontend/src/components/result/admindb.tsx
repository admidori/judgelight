import React from "react";
import { handleGetProblemTotalNumber } from "../problem/hooks";
import axios from "axios";
import { baseURL } from "../../pages";

export default function AdminDatabase(){
    const { databaseResult, problemTotalNumber } = handleGetAllResult()
    return(
        <p>開発者用ツールのConsole画面から答えの一覧を見ることができます．</p>
    );
}

const handleGetAllResult = () => {
    const [databaseResult, SetDatabaseResult] = React.useState({result: "",})
    const problemTotalNumber = handleGetProblemTotalNumber()
    React.useEffect(() => {
        axios.get(baseURL+"/database/result/all", {})
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpDatabaseResult = {
                result: response.data.result
            }
            SetDatabaseResult(tmpDatabaseResult)
        })
        .catch(function(error){
        })
    },[])

    return {databaseResult, problemTotalNumber}
}

import React from "react"
import axios from "axios"
import { baseURL } from "../../pages"

export const handleGetInitialCode = (num) => {
    const [problemInitialCode, SetProblemInitialCode] = React.useState("")

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                parameter: "InitialCode",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemInitialCode(responseJsonData.data.initialCode)
        }).catch(function(error){
            console.log(error)
        })
    },[num])

    return problemInitialCode
}

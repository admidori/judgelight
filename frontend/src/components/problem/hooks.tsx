import React from "react";
import axios from "axios";
import { baseURL } from "../../pages/index";

export const handleGetProblemTotalNumber = () => {
    const [problemTotalNumber, SetProblemTotalNumber] = React.useState(0)
    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info", {
            params: {
                paramater: "NumberOfProblem",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response));
            SetProblemTotalNumber(responseJsonData.data.paramater)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])
    
    return { problemTotalNumber }
}

export const handleTitle = (num) => {
    const [problemTitle, SetProblemTitle] = React.useState({
        title: "",
        problemNumber: "",
    })

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: String(num),
                paramater: "Title",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemTitle({
                title: responseJsonData.data.title,
                problemNumber: responseJsonData.data.problemNumber,
            })
        }).catch(function(error){
            console.log(error)
        })
    },[num])

    return { problemTitle }
}

export const handleCase = (num, total) => {
    const [problemCase, SetProblemCase] = React.useState({
        input: [],
        output: [],
    })
    
    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                paramater: "Case",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            for (let i=0;i<total;i++){
                SetProblemCase[i]({
                        input: responseJsonData.data.exampleInputData[i],
                        output: responseJsonData.data.exampleOutputData[i],
                    }
                )}
            }).catch(function(error){
                console.log(error)
            })
    },[num])
    return { problemCase }
}

export const handleAppendix = (num) => {
    const [problemAppendix, SetProblemAppendix] = React.useState({
        score: 0,
        limitTime: 0,
        limitMemory: 0,
    })

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                paramater: "Appendix",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemAppendix({
                score: responseJsonData.data.score,
                limitTime: responseJsonData.data.limitTime,
                limitMemory: responseJsonData.data.limitMemory,
            })
        }).catch(function(error){
            console.log(error)
        })
    },[num])

    return { problemAppendix }
}

export const handleDescription = (num) => {
    const [problemDescription, SetProblemDescription] = React.useState({
        description: "",
        initialCode: "",
    })

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                paramater: "Description",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemDescription({
                description: responseJsonData.data.description,
                initialCode: responseJsonData.data.initialCode,
            })
        })
        .catch(function(error){
            console.log(error)
    })
    },[num])

    return { problemDescription }
}

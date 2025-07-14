import React from "react";
import axios from "axios";
import { baseURL } from "../../pages/index";

export const handleGetProblemTotalNumber = () => {
    const [problemTotalNumber, SetProblemTotalNumber] = React.useState(0)
    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info", {
            params: {
                parameter: "NumberOfProblem",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response));
            SetProblemTotalNumber(responseJsonData.data.parameter)
        })
        .catch(function(error){
        })
    },[])
    
    return problemTotalNumber
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
                parameter: "Title",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemTitle({
                title: responseJsonData.data.title,
                problemNumber: responseJsonData.data.problemNumber,
            })
        }).catch(function(error){
        })
    },[num])

    return { problemTitle }
}

export const handleCase = (num, total) => {
    const [problemCase, SetProblemCase] = React.useState({
        input: "",
        output: "",
        description: "",
    })
    
    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                parameter: "TestCase",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpProblemCase = {
                input: responseJsonData.data.testCaseInputData,
                output: responseJsonData.data.testCaseOutputData,
                description: responseJsonData.data.testCaseDescription,
            }
            SetProblemCase(tmpProblemCase)
        }).catch(function(error){
            })
    },[num,total])
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
                parameter: "Appendix",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemAppendix({
                score: responseJsonData.data.score,
                limitTime: responseJsonData.data.limitTime,
                limitMemory: responseJsonData.data.limitMemory,
            })
        }).catch(function(error){
        })
    },[num])

    return { problemAppendix }
}

export const handleDescription = (num) => {
    const [problemDescription, SetProblemDescription] = React.useState()

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                parameter: "Description",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemDescription(responseJsonData.data.description)
        })
        .catch(function(error){
    })
    },[num])

    return problemDescription
}

export const handleGetProblemCaseTotalNumber = (num) => {
    const [problemCaseTotalNumber, SetProblemCaseTotalNumber] = React.useState(0)

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                parameter: "CaseTotalNumber",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            SetProblemCaseTotalNumber(responseJsonData.data.totalNumber)
        })
        .catch(function(error){
    })
    },[num])

    return problemCaseTotalNumber
}

export const handleLimitation = (num) => {
    const [problemLimitation, SetProblemLimitation] = React.useState({
        description: "",
        input: "",
        output: "",
    })
    
    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: num,
                parameter: "Limitation",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpProblemLimitation = {
                description: responseJsonData.data.description,
                input: responseJsonData.data.input,
                output: responseJsonData.data.output,
            }
            SetProblemLimitation(tmpProblemLimitation)
            }).catch(function(error){
            })
    },[num])
    return { problemLimitation }
}

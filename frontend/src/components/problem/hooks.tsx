import React from "react";
import axios from "axios";
import { baseURL } from "../../pages/index";

export const handleMenu = () => {
    const [problemNumber, SetProblemNumber] = React.useState(0)

    axios.get(baseURL+"/get/problem/info", {
        params: {
            paramater: "NumberOfProblem",
        }
    })
    .then(function(response){
        const responseJsonData = JSON.parse(JSON.stringify(response));
        SetProblemNumber(responseJsonData.data.paramater)
    })
    .catch(function(error){
        console.log(error)
    })

    return problemNumber
}

export const handleTitle = (num) => {
    const [problemTitle, SetProblemTitle] = React.useState({
        title: "",
        problemNumber: "",
    })

    axios.get(baseURL+"/get/problem/info",{
        params: {
            problemNumber: num,
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

    return problemTitle
}

export const handleCase = (num, total) => {
    const [testCase, SetTestCase] = React.useState({
        input: [],
        output: [],
    })

    axios.get(baseURL+"/get/problem",{
        params: {
            problemNumber: num,
            paramater: "Case",
        }
    }).then(function(response){
        const responseJsonData = JSON.parse(JSON.stringify(response))
        for (let i=0;i<total;i++){
            SetTestCase[i]({
                    input: responseJsonData.data.exampleInputData[i],
                    output: responseJsonData.data.exampleOutputData[i],
                }
            )}
        }).catch(function(error){
            console.log(error)
        })
    return testCase
}

export const handleAppendix = (num) => {
    const [problemAppendix, SetProblemAppendix] = React.useState({
        score: 0,
        limitTime: 0,
        limitMemory: 0,
    })

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

    return problemAppendix
}

export const handleDescription = (num) => {
    const [problem, SetProblem] = React.useState({
        description: "",
        initialCode: "",
    })

    axios.get(baseURL+"/get/problem/info",{
        params: {
            problemNumber: num,
            paramater: "Description",
        }
    })
    .then(function(response){
        const responseJsonData = JSON.parse(JSON.stringify(response))
        SetProblem({
            description: responseJsonData.data.description,
            initialCode: responseJsonData.data.initialCode,
        })
    })
    .catch(function(error){
        console.log(error)
    })
}

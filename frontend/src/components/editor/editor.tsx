import React from "react";
import axios from 'axios'; 
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c'
import 'prismjs/themes/prism.css'
import { baseURL } from "../../pages";
import { ProblemNumberContext } from "../../provider/problemNumber";
import { v4 as uuidv4 } from 'uuid';
import { AuthInfoContext } from "../../provider/auth";
import { Box, Container } from "@material-ui/core";

export default function ProgramEditor() {
    const [problemNumber, setProblemNumber] = React.useContext(ProblemNumberContext)
    const [code, setCode] = React.useState("")
    const [resultStatus, setResultStatus] = React.useState("")
    const [authInfo, setAuthInfo] = React.useContext(AuthInfoContext)
    
    const [ problemTestCaseInput, SetProblemTestCaseInput ] = React.useState()
    const [ problemTestCaseOutput, SetProblemTestCaseOutput ] = React.useState()
    const [ problemSecretCaseInput, SetProblemSecretCaseInput ] = React.useState()
    const [ problemSecretCaseOutput, SetProblemSecretCaseOutput ] = React.useState()

    const [ problemLimitTime, SetProblemLimitTime ] = React.useState()
    const [ problemLimitMemory, SetProblemLimitMemory ] = React.useState()
    const [ problemScore, SetProblemScore ] = React.useState()

    React.useEffect(() => {
        setResultStatus("")

        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: problemNumber,
                parameter: "InitialCode",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            setCode(responseJsonData.data.initialCode)
        }).catch(function(error){
        })

        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: problemNumber,
                parameter: "Case",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpProblemTestCaseInput = responseJsonData.data.testCaseInputData
            const tmpProblemTestCaseOutput = responseJsonData.data.testCaseOutputData
            const tmpProblemSecretCaseInput = responseJsonData.data.secretCaseInputData
            const tmpProblemSecretCaseOutput = responseJsonData.data.secretCaseOutputData
            SetProblemTestCaseInput(tmpProblemTestCaseInput)
            SetProblemTestCaseOutput(tmpProblemTestCaseOutput)
            SetProblemSecretCaseInput(tmpProblemSecretCaseInput)
            SetProblemSecretCaseOutput(tmpProblemSecretCaseOutput)
        }).catch(function(error){
        })
        
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: problemNumber,
                parameter: "Appendix",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            const tmpProblemLimitTime = responseJsonData.data.limitTime
            const tmpProblemLimitMemory = responseJsonData.data.limitMemory
            const tmpProblemScore = responseJsonData.data.score
            SetProblemLimitTime(tmpProblemLimitTime)
            SetProblemLimitMemory(tmpProblemLimitMemory)
            SetProblemScore(tmpProblemScore)
        }).catch(function(error){
        })
    },[problemNumber])

    const  handleClick = () => {
        const sendJsonData = JSON.stringify({
            "data": code,
            "dataID": uuidv4(),
            "authorID": authInfo.userId,
            "language": "c",
            "timeout": problemLimitTime,
            "memory": problemLimitMemory,
            "testCaseInput": problemTestCaseInput,
            "testCaseOutput": problemTestCaseOutput,
            "secretCaseInput": problemSecretCaseInput,
            "secretCaseOutput": problemSecretCaseOutput,
        })
        
        setResultStatus("Judging")
        axios.post(baseURL+'/program/submit',sendJsonData)
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response));
            setResultStatus(responseJsonData.data.ResultStatus)

            if (responseJsonData.data.ResultStatusCode === 0){
                const sendJsonData = JSON.stringify({
                    "studentId": authInfo.userId,
                    "problemNum": problemNumber,
                    "resultStatusCode": responseJsonData.data.ResultStatusCode,
                    "resultScore": problemScore,
                })
                axios.post(baseURL+'/program/submit/result',sendJsonData)
                .then(function(response){
                    const responseJsonData = JSON.parse(JSON.stringify(response));
                }
                ).catch(function(error){
                })
            }
        })
        .catch(function(error){
        })
    }

    React.useEffect(() => {
        if (resultStatus!="Judging" && resultStatus!="") {
            alert(resultStatus);
        }
    }, [resultStatus]);

    return (
        <div>
            <Container maxWidth="md">
                <h3>Edit Here</h3>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.c)}
                    padding={10}
                    style={{
                        border: "#000000",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                    }}
                />
                <button onClick={handleClick}>Submit</button>
                <p>{resultStatus}</p>
            </Container>
        </div>
    );
}

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
import { Box } from "@material-ui/core";

export default function ProgramEditor() {
    const [problemNumber, setProblemNumber] = React.useContext(ProblemNumberContext)
    const [code, setCode] = React.useState("")
    const [resultStatus, setResultStatus] = React.useState("")
    const [authInfo, setAuthInfo] = React.useContext(AuthInfoContext)
    
    const [ problemTestCaseInput, SetProblemTestCaseInput ] = React.useState()
    const [ problemTestCaseOutput, SetProblemTestCaseOutput ] = React.useState()
    const [ problemSecretCaseInput, SetProblemSecretCaseInput ] = React.useState()
    const [ problemSecretCaseOutput, SetProblemSecretCaseOutput ] = React.useState()

    React.useEffect(() => {
        axios.get(baseURL+"/get/problem/info",{
            params: {
                problemNumber: problemNumber,
                parameter: "InitialCode",
            }
        }).then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            setCode(responseJsonData.data.initialCode)
        }).catch(function(error){
            console.log(error)
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
            console.log(error)
        })
    },[problemNumber])

    const  handleClick = () => {
        const sendJsonData = JSON.stringify({
            "data": code,
            "dataID": uuidv4(),
            "authorID": authInfo.userId,
            "language": "c",
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
                })
                axios.post(baseURL+'/program/submit/result',sendJsonData)
                .then(function(response){
                    const responseJsonData = JSON.parse(JSON.stringify(response));
                    console.log(responseJsonData)
                }
                ).catch(function(error){
                    console.log(error)
                })
            }
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <div>
            <h3>Edit Code</h3>
            <Box border={1}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.c)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                    }}
                />
            </Box>
            <button onClick={handleClick}>Submit</button>
            <p>{resultStatus}</p>
        </div>
    );
}

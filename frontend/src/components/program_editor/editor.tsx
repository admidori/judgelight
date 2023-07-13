import React from "react";
import axios from 'axios'; 

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c'
import 'prismjs/themes/prism.css'

import { now } from "./problem";

export default function ProgramEditor() {
    const baseURL = "http://localhost:8080/"
    const [code, setCode] = React.useState(
`#include <stdio.h>
int main(void){
    
}`
        );
    const [resultStatus, setResultStatus] = React.useState("");
    

    const  handleClick = () => {
        const sendJsonData = JSON.stringify(
            {
                "data": code,
                "dataID": "1",
                "problemID": now,
                "authorID": "1",
                "language": "c"
            }
        );
        
        setResultStatus("Judging")
        axios.post(baseURL+'program/submit',sendJsonData)
            .then(function(response){
                const responseJsonData = JSON.parse(JSON.stringify(response));
                setResultStatus(responseJsonData.data.ResultStatus)
            })
            .catch(function(error){
                console.log(error)
            })
    }

    return (
        <div>
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
        <button onClick={handleClick}>Submit</button>
        <p>{resultStatus}</p>
        </div>
    );
}

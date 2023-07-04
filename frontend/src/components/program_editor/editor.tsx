import React from "react";
import axios from 'axios'; 

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c'
import 'prismjs/themes/prism.css'

export default function ProgramEditor() {
    const baseURL = "http://localhost:8080/"
    const [code, setCode] = React.useState(
`#include <stdio.h>
int main(void){
    
}`
        );

    const  handleClick = () => {
        const sendJsonData = JSON.stringify(
            {
                "data": code,
                "dataID": "1",
                "problemID": "1",
                "authorID": "1",
                "language": "c"
            }
        );

        axios.post(baseURL+'program/submit',sendJsonData)
            .then(function(response){
                const responseJsonData = JSON.parse(JSON.stringify(response));
                const resultStatus = responseJsonData.data.ResultStatus

                if (resultStatus == "AC"){
                    
                }
                else if (resultStatus == "WA"){
                    
                }
                else if (resultStatus == "CE"){

                }
                else{
                    console.log("Eroor")
                }
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
                fontSize: 12,
            }}
        />
        <button onClick={handleClick}>Submit</button>
        </div>
    );
}

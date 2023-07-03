import React from "react";
import axios from 'axios'; 

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c'
import 'prismjs/themes/prism.css'

export default function ProgramEditor() {
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
                "authorID": "1",
                "language": "c"
            }
        );

        axios.post('http://localhost:8080/program/submit',sendJsonData);
    }

    return (
        <div>
        <Editor
        value={code}
        onValueChange={code => setCode(code)}
        // Todo: Select language
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
import React from "react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c'

const code = 
`#include<stdio.h>
int main(void){
    
}`;

function handleClick(code){
    console.log(code)
}

export default class ProgramEditor extends React.Component{
    state = { code }
    render(){
    return(
        <div>
        <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.c)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />
        <button onClick={
            () => handleClick(this.state)
        }>Submit</button>
        </div>
    )
}
}
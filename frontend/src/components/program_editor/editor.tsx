import React from "react";
import axios from 'axios';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c'

export default class ProgramEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:
            `#include<stdio.h>
            int main(void){
            
            }`,
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({ isLoading: ture });
        var params = new URLSearchParams();
        params.append("program",{})
        axios.post("http://backend:8080/post", params)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(code)
    }

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
            () => this.handleClick(this.state)
        }>Submit</button>
        </div>
    )
}
}
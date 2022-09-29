import React, {useState} from 'react';
import axios from 'axios';

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

var params = new URLSearchParams();
params.append("program", "itisdata")
const url = axios.post("http://backend:8080/post", params)
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

const code = `function add(a, b) {
    return a + b;
}
`;

const handleClick = (code) => {
    console.log(code)
}

class Index extends React.Component {
    state = { code }
    render() {
        return (
            <div>
            <Menubar />
            <Editor
                value={this.state.code}
                onValueChange={code => this.setState({ code })}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />

            <button onClick={() => handleClick(this.state)}>Submit</button>
            <Footer />
            </div>
        );
    }
}

export default Index;
import React, {useState} from 'react';
import axios from 'axios';

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import ProgramEditor from '../components/program_editor/editor';

var params = new URLSearchParams();
params.append("program", "itisdata")
const url = axios.post("http://backend:8080/post", params)
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

class Index extends React.Component {
    render() {
        return (
            <div>
            <Menubar />
            <ProgramEditor />
            <Footer />
            </div>
        );
    }
}

export default Index;
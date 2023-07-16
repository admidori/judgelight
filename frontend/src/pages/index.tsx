import React from 'react';

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import ProgramEditor from '../components/program_editor/editor';
import Problem from '../components/program_editor/problem';
import Login from '../components/login/login';

export const domain = "192.168.2.2"

class Index extends React.Component {
    render() {
        return (
            <div>
            <Header />
            <Login />
            <Problem />
            <hr></hr>
            <h3>Edit Code</h3>
            <ProgramEditor />
            <Footer />
            </div>
        );
    }
}

export default Index;

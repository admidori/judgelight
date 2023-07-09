import React from 'react';

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import ProgramEditor from '../components/program_editor/editor';
import Problem from '../components/program_editor/problem';

class Index extends React.Component {
    render() {
        return (
            <div>
            <Header />
            <Menubar />
            <Problem />
            <ProgramEditor />
            <Footer />
            </div>
        );
    }
}

export default Index;
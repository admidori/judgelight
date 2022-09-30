import React from 'react';

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import ProgramEditor from '../components/program_editor/editor';

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
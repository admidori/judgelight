import React from 'react';
import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import ProgramEditor from '../components/editor/editor';
import Problem from '../components/problem/problem';
import AuthContextProvider from '../provider/auth';
import ProblemNumberProvider from '../provider/problemNumber';

class Index extends React.Component {
    render() {
        return (
            <div>
                <ProblemNumberProvider>
                    <AuthContextProvider>
                        <Header />
                        <Problem />
                        <hr></hr>
                        <ProgramEditor />
                        <Footer />
                    </AuthContextProvider>
                </ProblemNumberProvider>
            </div>
        );
    }
}

export default Index;

import React from "react";

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Database from "../components/result/database";
import AuthContextProvider from "../provider/auth";
import Score from "../components/result/score";

class Result extends React.Component{
    render(){
        return(
            <AuthContextProvider>
                <Header />
                <Score />
                <Database />
                <Footer />
            </AuthContextProvider>
        )
    };
}

export default Result

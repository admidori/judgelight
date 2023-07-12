import React from "react";

import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import Database from "../components/result/database";

class Result extends React.Component{
    render(){
        return(
            <div>
            <Header />
            <Menubar />
            <Database />
            <Footer />
            </div>
        )
    };
}

export default Result
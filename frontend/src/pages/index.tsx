import React from 'react';
import axios from 'axios';
import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import Menubar from '../components/common/menubar/menubar';
import Programbox from '../components/programbox/programbox';

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
            <Programbox />
            <Footer />
            </div>
        );
    }
}

export default Index;
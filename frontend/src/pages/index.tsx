import React from 'react';
import axios from 'axios';
import Header from "../components/header/header";
import Footer from '../components/footer/footer';
import Menubar from '../components/menubar/menubar';

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
            <div id="main" style={{ height: 300, background: "#eee" }}>
                        main
            </div>
            <Footer />
            </div>
        );
    }
}

export default Index;
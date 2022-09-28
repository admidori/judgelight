import React from 'react';
import Header from "../components/header/header";
import Footer from '../components/footer/footer';
import Menubar from '../components/menubar/menubar';

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
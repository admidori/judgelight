import React from 'react';
import config from "../../config.json";

export var baseURL = config.domain + ":" + config.apiPort

class Index extends React.Component {
    render() {
        return (
            <div>
                <h1>Please wait</h1>
            </div>
        );
    }
}

export default Index;

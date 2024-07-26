import React from 'react';
import config from "../../config.json";
import Link from 'next/link';
import AdminDatabase from '../components/result/admindb';

export var baseURL = config.domain + ":" + config.apiPort

class Index extends React.Component {
    render() {
        return (
            <div>
                <AdminDatabase></AdminDatabase>
            </div>
        );
    }
}

export default Index;

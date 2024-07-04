import React from 'react';
import config from "../../config.json";
import Link from 'next/link';

export var baseURL = config.domain + ":" + config.apiPort

class Index extends React.Component {
    render() {
        return (
            <div>
                <Link href="/problem">
                <p>
                    ここをクリックすると問題が表示されます
                </p>
                </Link>
            </div>
        );
    }
}

export default Index;

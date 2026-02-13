import React from 'react';
import config from "../../config.json";
import Link from 'next/link';

export var baseURL = "/api"

export default function Index() {
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


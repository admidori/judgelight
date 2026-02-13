import React from 'react';
import config from "../../config.json";
import Link from 'next/link';
import AdminDatabase from '../components/result/admindb';

export var baseURL = "/api"

export default function Admin() {
    return (
        <div>
            <AdminDatabase></AdminDatabase>
        </div>
    );
}

import React from "react";
import Link from "next/link";

export default function Menubar(){
    return (
    <nav style={{ background: "#666" }}>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
            <li style={{ margin: 10 }}><Link href="/" style={{ color: "#fff", textDecoration: 'none' }}>Home</Link></li>
            <li style={{ margin: 10 }}><Link href="/result" style={{ color: "#fff", textDecoration: 'none' }}>Result</Link></li>
        </ul>
    </nav>
    )
}

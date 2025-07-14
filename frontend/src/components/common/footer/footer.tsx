import React from "react";
import Config from "../../../../config.json";

export default function Footer(){
    return (
        <footer style={{ height: 25, background: "#666", color: "#fff" }}>
            <p style={{ textAlign: "center" }}>Judgelight v{Config.version} ({Config.codeName})</p>
        </footer>
    )
}

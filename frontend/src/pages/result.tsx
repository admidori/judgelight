import React from "react";

import Header from "../components/common/header/header";
import Database from "../components/result/database";
import AuthContextProvider from "../provider/auth";
import Score from "../components/result/score";

export default function Result() {
    return(
        <div>
            <AuthContextProvider>
            <Header />
            <Score />
                <Database />
            </AuthContextProvider>
        </div>
    )
}

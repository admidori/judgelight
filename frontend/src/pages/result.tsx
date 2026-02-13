import React from "react";
import Header from "../components/common/header/header";
import Database from "../components/result/database";
import AuthContextProvider from "../provider/auth";
import Score from "../components/result/score";
import Menu from "../components/common/menu/menu";
import { Layout } from "antd";

const { Sider, Content } = Layout;

export default function Result() {
    return(
        <AuthContextProvider>
            <Layout style={{ minHeight: '100vh' }}>
                <Header />
                <Layout>
                    <Menu />
                    <Content>
                        <Score />
                        <Database />
                    </Content>
                </Layout>
            </Layout>
        </AuthContextProvider>
    )
}

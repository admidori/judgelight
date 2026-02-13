import React from 'react';
import { Layout } from 'antd';
import Header from "../components/common/header/header";
import ProgramEditor from '../components/editor/editor';
import Problem from '../components/problem/problem';
import AuthContextProvider from '../provider/auth';
import ProblemNumberProvider from '../provider/problemNumber';
import Menu from '../components/common/menu/menu';

const { Sider, Content } = Layout;

export default function ProblemPage() {
    return (
        <ProblemNumberProvider>
            <AuthContextProvider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout>
                        <Menu />
                        <Content style={{ 
                            padding: '24px',
                            background: '#fff',
                            minHeight: 280
                        }}>
                            <Problem />
                            <hr />
                            <ProgramEditor />
                        </Content>
                    </Layout>
                </Layout>
            </AuthContextProvider>
        </ProblemNumberProvider>
    );
}

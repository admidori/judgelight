import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from "../components/common/header/header";
import Footer from '../components/common/footer/footer';
import GeneralMenu from '../components/common/menu/generalMenu';
import ProgramEditor from '../components/editor/editor';
import Problem from '../components/problem/problem';
import AuthContextProvider from '../provider/auth';
import ProblemNumberProvider from '../provider/problemNumber';

const { Sider, Content } = Layout;

export default function ProblemPage() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <ProblemNumberProvider>
            <AuthContextProvider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout>
                        <Sider 
                            width={256}
                            collapsedWidth={80}
                            theme="light"
                            style={{ 
                                background: '#fff',
                                borderRight: '1px solid #f0f0f0'
                            }}
                            trigger={null}
                            collapsible
                            collapsed={collapsed}
                        >
                            <GeneralMenu collapsed={collapsed} onCollapse={setCollapsed} />
                        </Sider>
                        <Layout>
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
                    <Footer />
                </Layout>
            </AuthContextProvider>
        </ProblemNumberProvider>
    );
}

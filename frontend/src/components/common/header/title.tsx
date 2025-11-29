import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../../../pages";
import { Layout, Typography, Space, Tag } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';
import LoginModal from "../login/login";
import LoginIcon from "./loginIcon";

const { Header } = Layout;
const { Title } = Typography;

export default function ContestTitle() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [contestTitle, setContestTitle] = React.useState<string>("")
    const [contestStartTime, setContestStartTime] = React.useState<string>("")
    const [contestEndTime, setContestEndTime] = React.useState<string>("")

    React.useEffect(() => {
        axios.get(baseURL+"/get/contest/info")
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            setContestTitle(responseJsonData.data.title)
            setContestStartTime(responseJsonData.data.startTime)
            setContestEndTime(responseJsonData.data.endTime)
        })
        .catch(function(error){
        })
    }, [])

    return (
        <Header style={{
            background: '#1890ff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>
                {contestTitle}
            </Title>
            
            <Space size="large">
                <Tag icon={<ClockCircleOutlined />} color="blue">
                    開始: {contestStartTime}
                </Tag>
                <Tag icon={<ClockCircleOutlined />} color="red">
                    終了: {contestEndTime}
                </Tag>
                <LoginIcon />
            </Space>
        </Header>
    );
}

import React from 'react'
import LoginModal from '../login/login'
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function LoginIcon() {
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setLoginModalOpen(true)} icon={<UserOutlined />}>
                Login
            </Button>
            <LoginModal 
                open={loginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
            />
        </>
    )
}

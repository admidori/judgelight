import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, Space, notification } from "antd";
import { LoginContext, AuthInfoContext } from "../../../provider/auth";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
    const loginStatus = React.useContext(LoginContext);
    const [authInfo, setAuthInfo] = React.useContext(AuthInfoContext);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    
    useEffect(() => {
        const localStorageAuthInfo = localStorage.getItem("authInfo");
        if (localStorageAuthInfo) {
            const parsed = JSON.parse(localStorageAuthInfo);
            setAuthInfo(parsed);
            form.setFieldsValue({
                userId: parsed.userId,
                userPassword: parsed.userPassword
            });
        } else {
            setAuthInfo({ userId: "", userPassword: "" });
        }
    }, []);

    const handleLogin = (values: any) => {
        setAuthInfo({ userId: values.userId, userPassword: values.userPassword });
        if(loginStatus){
            api.success({
                title: 'ログイン成功',
                message: 'ログイン成功',
                description: '正常にログインしました。',
                placement: 'topRight',
            });
        }
        onClose();
    };

    const handleLogout = () => {
        setAuthInfo({ userId: "", userPassword: "" });
        alert("Logout Successful");
        localStorage.removeItem("authInfo");
        window.location.reload();
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={loginStatus ? "ユーザー情報" : "ログイン"}
                open={open}
                onCancel={onClose}
                footer={null}
            width={400}
            >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleLogin}
                initialValues={authInfo}
            >
                <Form.Item
                    label="学籍番号"
                    name="userId"
                    rules={[{ required: !loginStatus, message: '学籍番号を入力してください' }]}
                >
                    <Input 
                        placeholder="学籍番号" 
                        disabled={loginStatus}
                    />
                </Form.Item>

                <Form.Item
                    label="パスワード"
                    name="userPassword"
                    rules={[{ required: !loginStatus, message: 'パスワードを入力してください' }]}
                >
                    <Input.Password 
                        placeholder="パスワード" 
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                        >
                            ログイン
                        </Button>
                        <Button onClick={onClose}>
                            閉じる
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            </Modal>
        </>
    );
}

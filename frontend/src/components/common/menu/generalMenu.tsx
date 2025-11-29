import React from "react";
import Link from "next/link";
import { LoginContext } from "../../../provider/auth";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";
import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import LoginModal from "../login/login";

interface GeneralMenuProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

export default function GeneralMenu({ collapsed, onCollapse }: GeneralMenuProps) {
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const isLoggedIn = React.useContext(LoginContext);

    type MenuItem = Required<MenuProps>['items'][number];

    const menuItems: MenuItem[] = [
        {
            key: 'problems',
            label: (
                <Link href="/problem" style={{ color: 'inherit', textDecoration: 'none' }}>
                    PROBLEMS
                </Link>
            ),
            icon: <DesktopOutlined />,
        },
        {
            key: 'result',
            label: (
                <Link href="/result" style={{ color: isLoggedIn ? 'inherit' : 'gray', textDecoration: 'none', pointerEvents: isLoggedIn ? 'auto' : 'none' }}>
                    RESULT
                </Link>
            ),
            disabled: !isLoggedIn,
            icon: <PieChartOutlined />,
        },
    ];

    const loginMenuItem: MenuItem[] = [
        {
            key: 'login',
            label: isLoggedIn ? 'LOGOUT' : 'LOGIN',
            icon: <UserOutlined />,
            onClick: () => setLoginModalOpen(true),
        },
    ];

    return (
        <>
            <Button
                type="text"
                onClick={() => onCollapse(!collapsed)}
                style={{ marginBottom: 16, width: '100%' }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={menuItems}
                    inlineCollapsed={collapsed}
                    style={{ flex: 1, borderRight: 0 }}
                />
                <Menu
                    mode="inline"
                    items={loginMenuItem}
                    inlineCollapsed={collapsed}
                    style={{ borderRight: 0, borderTop: '1px solid #f0f0f0' }}
                />
            </div>
            <LoginModal 
                open={loginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
            />
        </>
    )
}

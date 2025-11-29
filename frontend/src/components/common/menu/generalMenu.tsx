import React from "react";
import Link from "next/link";
import { LoginContext } from "../../../provider/auth";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";
import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';

interface GeneralMenuProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

export default function GeneralMenu({ collapsed, onCollapse }: GeneralMenuProps) {
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

    return (
        <>
            <Button
                type="text"
                onClick={() => onCollapse(!collapsed)}
                style={{ marginBottom: 16, width: '100%' }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                items={menuItems}
                inlineCollapsed={collapsed}
            />
        </>
    )
}

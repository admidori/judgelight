import React, { useState } from "react";
import GeneralMenu from "./generalMenu";
import { Layout } from "antd";

export default function Menu() {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider, Content } = Layout;

    return(
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
    )
}   

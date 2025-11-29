import React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

export default function Menu(props) {
    const handleChange = (key: string) => {
        props.handleNowProblemChange(Number(key));
    };

    const items: TabsProps['items'] = Array.from(
        { length: Number(props.problemTotal) },
        (_, i) => ({
            key: String(i + 1),
            label: `問題 ${i + 1}`,
        })
    );

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={handleChange}
            type="card"
            style={{ 
                padding: '0 16px',
                backgroundColor: '#fff' 
            }}
        />
    );
}

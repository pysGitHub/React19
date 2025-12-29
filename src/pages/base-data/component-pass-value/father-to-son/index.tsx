import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SonDefault from './attribute-by-value';
import SonSolt from './son-solt';



const FatherToSon: React.FC = () => {
    const onChange = (key: string) => {
        console.log('Tab changed to: ', key);
    };

    /**
     * 属性传值：
     * 父组件向子组件传递数据、方法
    */
    const [name, setName] = useState('张三');
    const defaultOnChange = (data: string) => {
        console.log('父组件接收到子组件的调用, data:', data);
        setName(data)
    };


    /**
     * 特殊情况: 插槽
     * 使用子组件包裹父组件的内容
     * 子组件使用props.props接收插槽的内容
    */


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '属性传值',
            children: (
                <SonDefault name={name} updateName={setName} onChange={defaultOnChange} />
            ),
        },
        {
            key: '2',
            label: '特殊情况: 插槽 - props.props',
            children: (
                <SonSolt>
                    <span>父组件投影到子组件 SonSolt 的span</span>
                </SonSolt>
            )
        },
    ];







    return (
        <>
            <h2><strong>组件传值: 父传子 简介:</strong></h2>
            <ul className="m-t-24">
                <li>
                    <h2><strong>属性传值</strong></h2>
                    <div>
                        <img src="/images/base-image/father-to-son1.png" alt="" />
                    </div>
                </li>

                <li className="m-t-24">
                    <h2><strong>特殊情况: 插槽</strong></h2>
                    <div>
                        <img src="/images/base-image/father-to-son2.png" alt="" />
                    </div>
                </li>
            </ul>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    );
}


export default FatherToSon;
// import { Outlet, Link } from "react-router-dom";

// interface RouterItem {
//     path: string;
//     title: string;
//     children?: RouterItem[];
// }

// const BasePage = () => {

//     const routerList: RouterItem[] = [
//         {path: "condition-render", title: "条件渲染"},
//         {path: "event-binding", title: "事件绑定"},
//         {path: "hooks", title: "Hooks",
//             children: [
//                 {path: "hooks-usestate", title: "useState"},
//                 {path: "hooks-useref", title: "useRef"},
//             ]
//         }
//     ]

//     return (
//         <>
//         <ul>
//             {routerList.map(item=>(
//                 <li key={item.path}>
//                     <Link to={item.path}>{item.title}</Link>
//                     {item.children && (
//                         <ul>
//                             {item.children.map(child=>(
//                                 <li key={child.path}>
//                                     {/* 子路由需要包含父路径前缀，确保生成 /base/hooks/hooks-usestate 之类的路径 */}
//                                     <Link to={`${item.path}/${child.path}`}>{child.title}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </li>
//             ))}
//         </ul>
//         <Outlet></Outlet>
//         </>
//     )
// }

// export default BasePage;



import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './index.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';


interface RouterItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: RouterItem[];
}




const { Header, Sider, Content } = Layout;

const BasePage: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['condition-render']);
    const [openKeys, setOpenKeys] = useState<string[]>(['hooks']);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const routerList: RouterItem[] = [
        {key: '/base', label: 'Base Data', icon: <UserOutlined />, 
            children: [
                { key: 'condition-render', label: '条件渲染', icon: <UploadOutlined /> },
                { key: 'event-binding', label: '事件绑定', icon: <UploadOutlined />, },
                { key: 'hooks', label: 'Hooks', icon: <VideoCameraOutlined />,
                    children: [
                        { key: 'hooks/hooks-usestate', label: 'useState' },
                        { key: 'hooks/hooks-useref', label: 'useRef' }
                    ]
                }
            ]
        },
    ]

    /**
     * 这部分代码可以分为两个部分：
     * 1. 左侧 { key } - 这是 ES6 的解构赋值语法
     * 2. 右侧 : { key: string } - 这是 TypeScript 的类型注解，
     * 表示传入的对象必须有一个 key 属性，且该属性的类型是字符串。
     */
    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    // 监听路由变化，同步菜单选中状态
    useEffect(() => {
        // 根据当前路径确定选中的菜单项
        let path = location.pathname.replace('/base/', '');
        if (path) {
            setSelectedKeys([path]);
        }
    }, [location]);

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <Layout className='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">LOGO</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    items={routerList as any}
                    onClick={handleMenuClick}
                    onOpenChange={handleOpenChange}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default BasePage;
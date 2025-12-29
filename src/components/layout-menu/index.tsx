import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Layout, Menu, Button, type MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, TeamOutlined, ToolOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { monitorScreenWidth } from '../../utils/screenUtil';
import Global from '../../utils/global';
import { Subscription } from 'rxjs';
import './index.scss';

const { Sider } = Layout;

const LayoutMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [collapsedWidth, setCollapsedWidth] = useState<number>(64);
  const [subSelectedItem, setSubSelectedItem] = useState<string>('condition-render');
  const [siderWidth, setSiderWidth] = useState<string>('220px');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const mobileLayoutRef = useRef<Subscription | null>(null);
  type MenuItem = Required<MenuProps>['items'][number];

  const menuDaba: MenuItem[] = [
    { key: 'condition-render', icon: <PieChartOutlined />, label: '条件渲染' },
    { key: 'event-binding', icon: <DesktopOutlined />, label: '事件绑定' },
    {
      key: 'hooks',
      label: 'Api Hooks',
      icon: <MailOutlined />,
      children: [
        { key: 'hooks-usestate', label: 'useState', icon: <ContainerOutlined /> },
        { key: 'hooks-usereducer', label: 'useReducer', icon: <ContainerOutlined /> },
        { key: 'hooks-useref', label: 'useRef', icon: <ContainerOutlined /> },
        { key: 'hooks-useeffect', label: 'useEffect', icon: <ContainerOutlined /> },
      ],
    },
    {
      key: 'component-pass-value',
      label: '组件传值',
      icon: <AppstoreOutlined />,
      children: [
        { key: 'father-to-son', label: '父传子' },
        { key: 'son-to-father', label: '子传父' },
        { key: 'context-pass-value', label: '上下文传值' },
      ],
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    mobileLayoutRef.current = monitorScreenWidth(576).subscribe(isTrue => {
      setIsMobile(isTrue);
      if (isTrue) {
        setSiderWidth('576px');
        setCollapsedWidth(0);
        setIsCollapsed(true);
        console.log(isCollapsed);
      } else {
        setSiderWidth('220px');
        setCollapsedWidth(64);
      }
    });

    const collapsed$ = Global.getState<boolean>('collapsed').subscribe((state: boolean) => {
      console.log('collapsed 状态:', state);
      setIsCollapsed(state);
    });
    Global.addSubscription('collapsed', collapsed$);

    return () => {
      if (mobileLayoutRef.current) {
        mobileLayoutRef.current.unsubscribe();
      }

      // 取消所有订阅
      Global.clearAll();
    };
  }, []);

  // 设置只能展开一个菜单
  const toggleMenu = useCallback((openKeys: React.Key[] | undefined) => {
    // 保持只展开一个菜单的行为
    // 当有新展开的菜单时，只保留最后一个（最新点击的）
    if (openKeys && openKeys.length > 1) {
      setOpenKeys([openKeys.at(-1) as string]);
    } else {
      setOpenKeys(openKeys as string[] || []);
    }
  }, []);

  // // 允许多个菜单展开
  // const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
  //   setOpenKeys(keys);
  // };


  const navigateTo = useCallback((element: Parameters<NonNullable<MenuProps['onClick']>>[0]) => {
    setSubSelectedItem(element.key);
    console.log(`Navigating to ${element.key}`, element);
    navigate(element.key);
  }, [navigate]);
 
  const toggleCollapse = useCallback(() => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    Global.setState('collapsed', newState);
  }, [isCollapsed]);

 
  return (
    <section className="section">
      <Layout className="layout">
        <Sider
          className="sider"
          width={siderWidth}
          collapsedWidth={collapsedWidth}
          collapsible
          collapsed={isCollapsed}
          trigger={null}
        >
          <Menu
            className="global-ul"
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[subSelectedItem]}
            items={menuDaba}
            onOpenChange={toggleMenu}
            onClick={navigateTo}
          >
          </Menu>
          {!isMobile && (
            <Button
              className="trigger"
              type="text"
              icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapse}
            />
          )}
        </Sider>
      </Layout>
    </section>
  );
};

export default LayoutMenu;
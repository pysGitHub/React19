import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Layout, Menu, Button, type MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, TeamOutlined, ToolOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { monitorScreenWidth } from '../../utils/screenUtil';
import Global from '../../utils/global';
import { Subscription } from 'rxjs';
import './index.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const { Sider } = Layout;
export type MenuItem = Required<MenuProps>['items'][number];

const LayoutMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [collapsedWidth, setCollapsedWidth] = useState<number>(64);
  const [subSelectedItem, setSubSelectedItem] = useState<string>('condition-render');
  const [siderWidth, setSiderWidth] = useState<string>('220px');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const mobileLayoutRef = useRef<Subscription | null>(null);
  const menuDataList  :any  = useSelector((state: RootState) => state.kanban.menuData)

 console.log('-0---\n',menuDataList);




  // 由于菜单项的 icon 组件无法通过navigate的state传值，所以采用key:value的映射关系
  const icons: Record<string, React.ReactNode> = {
    'MenuFoldOutlined': <MenuFoldOutlined />,
    'MenuUnfoldOutlined': <MenuUnfoldOutlined />,
    'UserOutlined': <UserOutlined />,
    'TeamOutlined': <TeamOutlined />,
    'ToolOutlined': <ToolOutlined />,
    'PieChartOutlined': <PieChartOutlined />,
    'DesktopOutlined': <DesktopOutlined />,
    'ContainerOutlined': <ContainerOutlined />,
    'MailOutlined': <MailOutlined />,
    'AppstoreOutlined': <AppstoreOutlined />,
  }

 const menuData: MenuItem[] = useMemo(() => { 
  // 从menuDataList中遍历icon，找到则替换成icons中的组件标签
  return menuDataList.map((item: any) => {
    const newItem = { ...item }; // 创建item的副本，避免直接修改原对象
    if (item.icon && icons[item.icon]) {
      newItem.icon = icons[item.icon];
    }

    if (item.children) {
      newItem.children = item.children.map((child: any) => {
        const newChild = { ...child }; // 创建child的副本，避免直接修改原对象
        if (child.icon && icons[child.icon]) {
          newChild.icon = icons[child.icon];
        }
        return newChild;
      });
    }
    return newItem;
  });
 }, [menuDataList])

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 打印当前页面 URL（完整 URL 和路由 path）
    console.log('当前路由 path:', location.pathname);
    // 截取路由 path
    setSubSelectedItem(location.pathname.split('/').at(-1) as string);
  }, [location]);
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
            items={menuData}
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
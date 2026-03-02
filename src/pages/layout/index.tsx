import { Layout } from 'antd';
import './index.scss'
import { lazy, useState, useEffect, useRef } from 'react';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { monitorScreenWidth } from '../../utils/screenUtil';
import { Subscription } from 'rxjs';

const LayoutHeader = lazy(() => import('../../components/layout-header'));
const LayoutMenu = lazy(() => import('../../components/layout-menu'));
const LayoutFooter = lazy(() => import('../../components/layout-footer'));
const LayoutPage:React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const subscriptionRef = useRef<Subscription | null>(null);

  useEffect(() => {
    subscriptionRef.current = monitorScreenWidth(576).subscribe((mobile: boolean) => {
      setIsMobile(mobile);
    });
 
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return (
    <Layout className='app-layout'>
        {/* header */}
        <div className='app-header'>
            <LayoutHeader />
        </div>
        
        {/* 页面内容 */}
        <div className='app-content'> 
            {/* 左侧菜单 */}
            <div className={`app-menu ${isMobile ? 'isMobile' : ''}`}>
                <LayoutMenu />
            </div>

            {/* 右侧内容 */}
            <div className='app-main'> 
                <Content className='render-content'>
                    <Outlet />
                </Content>
                <div className='app-footer'>
                    <LayoutFooter />
                </div>
            </div>
        </div>

    </Layout>
  );
};

export default LayoutPage;
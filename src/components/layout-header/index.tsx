import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { monitorScreenWidth } from '../../utils/screenUtil';
import { useGlobal } from '../../utils/global';
import type { Subscription } from 'rxjs';
import './index.scss';

const { Option } = Select;

const LayoutHeader = () => {
  const global = useGlobal();
  
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [hiddenBreadCrumbContent, setHiddenBreadCrumbContent] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('zh');

  const languageList = [
    { label: '简体中文', value: 'zh' },
    { label: 'English', value: 'en' },
    { label: '繁體中文', value: 'tw' }
  ];

  useEffect(() => {
    const hiddenBreadCrumbContentSubscription: Subscription = monitorScreenWidth().subscribe(isTrue => {
      setHiddenBreadCrumbContent(isTrue);
    });

    const mobileLayoutSubscription: Subscription = monitorScreenWidth(576).subscribe(isTrue => {
      setIsMobile(isTrue);
      // 如果是移动端则刚开始闭合
      if (isTrue) {
        setIsCollapsed(true);
        global.setState('collapsed', true);
      } else {
        setIsCollapsed(false);
        global.setState('collapsed', false);
      }
    });

    return () => {
      hiddenBreadCrumbContentSubscription.unsubscribe();
      mobileLayoutSubscription.unsubscribe();
    };
  }, []);

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    console.log(lang);
  };

  const logOut = () => {
    console.log('logout');
  };

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    global.setState('collapsed', newCollapsed);
  };

  return (
    <>
      {!isMobile && (
        <header className="app-header">
          <div className="header-left">
            <img src="/images/others/logo-wistron.png" alt="logo" />
            <div className="driver"></div>
          </div>

          <div className="header-right">
            <div className="left">React19 Demo</div>
            {!hiddenBreadCrumbContent && (
              <ul className="right">
                <li className="user-info">Thomas Pan</li>
                <li className="language">
                  <Select
                    value={selectedLanguage}
                    onChange={changeLanguage}
                    placeholder="Select Language"
                    variant="borderless"
                    className='lanSelect'
                  >
                    {languageList.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </li>
                {/*  // NOSONAR 代表忽略该警告 */}
                <li className="logout" onClick={logOut} // NOSONAR
                >
                  登出
                </li>
              </ul>
            )}
          </div>
        </header>
      )}

      {isMobile && (
        <header className={`app-header ${isMobile ? 'mobile-header' : ''}`}>
          <div className="mobile-content">React19 Demo</div>
          <span  // NOSONAR
            className="trigger" 
            onClick={toggleCollapse}
          >
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </header>
      )}
    </>
  );
};

export default LayoutHeader;
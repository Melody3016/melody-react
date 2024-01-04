import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Tag, MenuProps, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './main-view.scss';
import { selectMenuList, selectNavList } from '@/store/reducers/appSlice';
import { useAppSelector } from '@/store/hooks';

const { Header, Sider, Content } = Layout;

const MainView: React.FC = () => {
  const [leftItems, setLeftItems] = useState<MenuProps['items']>([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  // 路由
  const navigate = useNavigate();

  // 顶部导航条
  const [navItems, setNavItems] = useState<MenuProps['items']>([]);
  const [selectedNav, setSelectedNav] = useState<string[]>([]);
  const navList = useAppSelector(selectNavList);
  const handleNavMenu = (list: INav[]) => {
    const menu: any = [];
    list.forEach(item => {
      const obj: any = {};
      obj.key = item.id;
      obj.label = item.title;
      obj.icon = <UserOutlined />;
      menu.push(obj);
    });
    return menu;
  };
  const handleClickNav = ({ key }) => {
    setSelectedNav([key]);
    const item = navList.find(ele => ele.id === key);
    // 判断url并进行跳转
    if (item && item.url) {
      window.open(item.url);
    }
    // 切换左侧menu
  };
  useEffect(() => {
    const menu = handleNavMenu(navList);
    setSelectedNav([menu[0]?.key]);
    setNavItems(menu);
  }, [navList]);

  // 左侧菜单
  const handleBreakpoint = broken => {
    setCollapsed(broken);
  };
  const menuList = useAppSelector(selectMenuList);
  // 处理左侧菜单数据
  const handleLeftMenu = (list: IMenuListRes[]) => {
    const menu: any = [];
    list.forEach(item => {
      const obj: any = {};
      obj.key = item.id;
      obj.label = item.title;
      obj.icon = <UserOutlined />;
      obj.path = item.path;
      if (item.children?.length && item.children?.length <= 1) {
        obj.type = '';
      } else {
        obj.type = '';
        obj.children = [];
        item.children?.forEach(ele => {
          const subObj: any = {};
          subObj.key = ele.id;
          subObj.label = ele.title;
          subObj.icon = <UserOutlined />;
          subObj.path = `${obj.path}/${ele.path}`;
          obj.children.push(subObj);
        });
      }
      menu.push(obj);
    });
    return menu;
  };
  // 左侧菜单点击
  const leftMenuClick = ({ item }) => {
    navigate(item.props.path);
  };
  // 只展开当前父级菜单
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // 处理左侧菜单数据
  useEffect(() => {
    const menu = handleLeftMenu(menuList);
    setLeftItems(menu);
    setRootSubmenuKeys(menu.map(item => item.key));
  }, [menuList]);

  return (
    <div className={style.main}>
      <Layout style={{ height: '100%' }}>
        <Sider
          className='leftMenu'
          width={220}
          trigger={null}
          theme='light'
          collapsible
          collapsed={collapsed}
          breakpoint='md'
          onBreakpoint={handleBreakpoint}
        >
          <div className='demo-logo-vertical'>
            {collapsed ? <p>平台</p> : <p>前后端分离快速开发平台</p>}
          </div>
          <Menu
            mode='inline'
            items={leftItems}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={leftMenuClick}
          />
          {leftItems?.length === 0 && (
            <Skeleton
              active
              title={{ width: 180 }}
              paragraph={{ rows: 18, width: Array(20).fill(180) }}
            />
          )}
        </Sider>
        <Layout>
          <Header
            className='navBar'
            style={{ background: colorBgContainer, justifyContent: 'space-between' }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <Menu
              style={{ flex: 1, minWidth: 200 }}
              mode='horizontal'
              selectedKeys={selectedNav}
              items={navItems}
              onClick={handleClickNav}
            />
            <div className={style.rightTopBox}>退出登录</div>
          </Header>
          <div className={style.navTags}>
            <div className={style.scrollContent}>
              <div className={style.scrollBody}>
                <Tag bordered={false}>Tag 1</Tag>
                <Tag bordered={false}>Tag 2</Tag>
                <Tag bordered={false}>Tag 3</Tag>
              </div>
            </div>
          </div>
          <Content
            style={{
              padding: 10,
              overflow: 'auto'
            }}
          >
            <h1>This is Main</h1>
            <div className={style.bigBox}></div>
            <br />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default MainView;

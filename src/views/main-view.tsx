import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Tag, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './main-view.scss';
import { selectMenuList } from '@/store/reducers/appSlice';
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

  // 左侧菜单数据
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
  // submenu keys of first level
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
        <Sider className='leftMenu' width={220} trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical'>
            <p>React</p>
            <p>前后端分离快速开发平台</p>
          </div>
          <Menu
            theme='dark'
            mode='inline'
            items={leftItems}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={leftMenuClick}
            style={{ width: 220 }}
          />
        </Sider>
        <Layout>
          <Header className='navBar' style={{ background: colorBgContainer }}>
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
              style={{ flex: 1 }}
              mode='horizontal'
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1'
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2'
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3'
                }
              ]}
            />
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

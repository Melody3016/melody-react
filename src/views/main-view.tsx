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
  // 路由
  const navigate = useNavigate();
  // 获取左侧菜单
  const menuList = useAppSelector(selectMenuList);
  const [leftItems, setLeftItems] = useState<MenuProps['items']>([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  // 左侧菜单点击
  const leftMenuClick = ({ item }) => {
    console.log(item.props.path);
    navigate(item.props.path);
  };

  // 处理左侧菜单数据
  useEffect(() => {
    console.log('menuList', menuList);

    const menu: any = [];
    menuList.forEach(item => {
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
    setLeftItems(menu);
  }, [menuList]);

  return (
    <div className={style.main}>
      <Layout style={{ height: '100%' }}>
        <Sider className='leftMenu' trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical'>
            <p>React</p>
            <p>前后端分离快速开发平台</p>
          </div>
          <Menu theme='dark' mode='inline' items={leftItems} onClick={leftMenuClick} />
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

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Space, Tag } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './main-view.scss';

const { Header, Sider, Content } = Layout;
const MainView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <div className={style.main}>
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          <Menu
            theme='dark'
            mode='inline'
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

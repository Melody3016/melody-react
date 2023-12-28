import { Link } from 'react-router-dom';
import { Tabs, Tooltip, Row, Col, Dropdown } from 'antd';
import { UserOutlined, PhoneOutlined, QrcodeOutlined } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { useState } from 'react';
import style from './login.scss';
import Header from '../../main-components/header';
import Footer from '../../main-components/footer';
import UserLoginForm from './user-login-form';
import MobileLoginForm from './mobile-login-form';

const tabsItems: TabsProps['items'] = [
  {
    key: 'userLogin',
    label: <span style={{ fontSize: 18 }}>账户密码登录</span>,
    icon: <UserOutlined />,
    children: <UserLoginForm />
  },
  {
    key: 'mobileLogin',
    label: <span style={{ fontSize: 18 }}>手机短信登录</span>,
    icon: <PhoneOutlined />,
    children: <MobileLoginForm />
  }
];
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to='/reset'>使用手机号重置密码</Link>
  },
  {
    key: '2',
    label: <Link to='/reset?type=2'>使用邮箱重置密码</Link>
  }
];

const Login: React.FC = () => {
  const [tabsKey, setTabsKey] = useState('userLogin');
  // const isLoading = false;
  // const submitLogin = () => {};

  return (
    <div className={style.login}>
      <div className={style.layout}>
        <Header></Header>
        <div className={style.pane}>
          {/* 登录面板 */}
          <Tabs
            destroyInactiveTabPane
            activeKey={tabsKey}
            size='large'
            items={tabsItems}
            onChange={activeKey => setTabsKey(activeKey)}
          />
          {/* 扫码登录入口小图标 */}
          <Tooltip title='扫码登陆' placement='rightTop'>
            <QrcodeOutlined className={style.qrCode} />
          </Tooltip>
          {/* 自动登录 */}
          {/* <Row justify='start'>
            <Col>
              <Checkbox>
                <span style={{ fontSize: 16 }}>自动登录</span>
              </Checkbox>
            </Col>
          </Row> */}
          {/* 登录按钮 */}
          {/* <Row style={{ margin: ' 20px 0' }}>
            <Button block type='primary' size='large' loading={isLoading} onClick={submitLogin}>
              {isLoading ? <span>登录中</span> : <span>登录</span>}
            </Button>
          </Row> */}
          {/* 其他操作 */}
          <Row justify='space-between' wrap={false}>
            <Col>
              <Dropdown menu={{ items }} trigger={['hover', 'click']} placement='bottomLeft'>
                <span className={style.forgetPass}>忘记密码</span>
              </Dropdown>
            </Col>
            <Col>
              <Link to='/register'>
                <span className={style.forgetPass}>点击注册</span>
              </Link>
            </Col>
          </Row>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default Login;

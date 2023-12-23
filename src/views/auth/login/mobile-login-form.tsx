import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import CountDownButton from '@/views/my-components/xboot/count-down-button';
// import style from './mobile-login-form.scss';

type FieldType = {
  mobile: string;
  code: string;
  saveLogin: boolean;
};
// 登录面板
const UserLoginForm: React.FC = () => {
  const isLoading = false;
  const submitLogin = () => {};
  return (
    <Form autoComplete='off' size='large'>
      <Form.Item<FieldType> hasFeedback name='mobile'>
        <Input allowClear prefix={<PhoneOutlined />} size='large' placeholder='请输入手机号' />
      </Form.Item>
      <Form.Item<FieldType> hasFeedback name='code'>
        <Row justify={'space-between'} gutter={20} wrap={false}>
          <Col flex={1}>
            <Input allowClear prefix={<MailOutlined />} placeholder='请输入短信验证码' />
          </Col>
          <Col>
            <CountDownButton
              autoCountDown
              countTime={10}
              style={{ width: 110 }}
              text='获取验证码'
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item<FieldType> hasFeedback valuePropName='checked' name='saveLogin'>
        <Checkbox>
          <span style={{ fontSize: 16 }}>自动登录</span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button block type='primary' loading={isLoading} onClick={submitLogin}>
          {isLoading ? <span>登录中</span> : <span>登录</span>}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserLoginForm;

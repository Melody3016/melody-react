import { useState } from 'react';
import { Form, Input, Row, Col, Checkbox, Button, Spin, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import style from './user-login-form.scss';
import useCaptchaImg from '@/hooks/useCaptchaImg';
import useAxios from '@/hooks/useAxios';
import { loginReq } from '@/api';

// 登录面板
const UserLoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // 获取验证码
  const { loadingCaptcha, captchaImg, captchaId, getCaptchaImg } = useCaptchaImg();
  // 登录
  const { fetchData } = useAxios<string, ILoginParam>(params => loginReq(params as ILoginParam));
  const [form] = Form.useForm<ILoginParam>();
  const [loginLoading, setLoginLoading] = useState(false);
  const submitLogin = async () => {
    // 进行表单验证
    try {
      const formValues = await form.validateFields();
      setLoginLoading(true);
      // 登录
      const params = {
        ...formValues,
        captchaId
      };
      const accessToken = await fetchData(params);
      if (accessToken) {
        console.log('登录成功！', accessToken);
        // const { afterLogin } = useAfterLogin(instance);
        // await afterLogin(accessToken, saveLogin.value);
      } else {
        form.resetFields();
      }
      setLoginLoading(false);
    } catch (error) {
      console.log('submitLogin error', error);
      setLoginLoading(false);
      messageApi.error('请正确填写！');
      getCaptchaImg();
    }
  };

  // 键盘回车提交登录
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // 执行其他代码
      submitLogin();
    }
  };

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        initialValues={{ saveLogin: true }}
        onKeyDown={handleKeyDown}
        autoComplete='off'
        size='large'
      >
        <Form.Item<ILoginParam>
          hasFeedback
          name='username'
          rules={[
            {
              required: true,
              message: '用户名不能为空'
            }
          ]}
        >
          <Input allowClear prefix={<UserOutlined />} size='large' placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item<ILoginParam>
          hasFeedback
          name='password'
          rules={[
            {
              required: true,
              message: '密码不能为空'
            },
            {
              len: 6,
              message: '密码少于6位'
            }
          ]}
        >
          <Input.Password allowClear prefix={<LockOutlined />} placeholder='请输入密码' />
        </Form.Item>
        <Form.Item<ILoginParam>
          hasFeedback
          name='code'
          rules={[
            {
              required: true,
              message: '验证码不能为空'
            }
          ]}
        >
          <Row justify={'space-between'} gutter={20} wrap={false}>
            <Col>
              <Input allowClear prefix={<MailOutlined />} placeholder='请输入图片验证码' />
            </Col>
            <Col>
              <div style={{ width: 110 }}>
                {loadingCaptcha ? (
                  <Spin className={style.imgCode} />
                ) : (
                  <img
                    src={captchaImg}
                    className={style.imgCode}
                    onClick={getCaptchaImg}
                    alt='图片验证码'
                  />
                )}
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item<ILoginParam> hasFeedback valuePropName='checked' name='saveLogin'>
          <Checkbox>
            <span style={{ fontSize: 16 }}>自动登录</span>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type='primary' loading={loginLoading} onClick={submitLogin}>
            {loginLoading ? <span>登录中</span> : <span>登录</span>}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserLoginForm;

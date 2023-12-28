import { Form, Input, Row, Col, Checkbox, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import CountDownButton from '@/views/my-components/xboot/count-down-button';
import SliderCaptcha from '@/views/my-components/origin/slider-captcha';
import useAxios from '@/hooks/useAxios';
import { sendSms } from '@/api';
import { validateMobile } from '@/libs/validate';
// import style from './mobile-login-form.scss';

// 登录面板
const UserLoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { fetchData } = useAxios();
  const isLoading = false;
  const submitLogin = () => {};
  const [form] = Form.useForm<ILoginParam>();

  // 发送短信验证码
  const handleVerify = () => {
    console.log('滑动验证成功');
  };
  const handleCountDownClick = async () => {
    // 滑动验证
    // 进行表单验证
    try {
      const formValues = await form.validateFields(['mobile']);
      if (!formValues.mobile) return;
      // 登录
      const params = {
        mobile: formValues.mobile,
        type: 1
      };
      const res = await fetchData<string, ISmsParam>(
        params => sendSms(params as ISmsParam),
        params
      );
      console.log('短语登录验证码！', res);

      if (res) {
        // console.log('短语登录验证码！', res);
      } else {
        form.resetFields();
      }
    } catch (error) {
      console.log('submitLogin error', error);
      messageApi.error('请正确填写！');
    }
  };
  return (
    <>
      {contextHolder}
      <Form form={form} initialValues={{ saveLogin: true }} autoComplete='off' size='large'>
        <Form.Item<ILoginParam>
          rules={[{ required: true, validator: validateMobile }]}
          hasFeedback
          name='mobile'
        >
          <Input allowClear prefix={<PhoneOutlined />} type='tel' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item<ILoginParam>
          rules={[
            { required: true, message: '短信验证码不能为空' },
            { len: 6, message: '短信验证码为6位数字' }
          ]}
          hasFeedback
          name='code'
        >
          <Row justify={'space-between'} gutter={20} wrap={false}>
            <Col flex={1}>
              <Input
                allowClear
                prefix={<MailOutlined />}
                type='number'
                placeholder='请输入短信验证码'
              />
            </Col>
            <Col>
              <CountDownButton
                autoCountDown
                countTime={10}
                style={{ width: 110 }}
                text='获取验证码'
                onClick={handleCountDownClick}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item<ILoginParam> hasFeedback valuePropName='checked' name='saveLogin'>
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
      <SliderCaptcha onVerify={handleVerify} />
    </>
  );
};

export default UserLoginForm;

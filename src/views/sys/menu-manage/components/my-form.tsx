import {
  AimOutlined,
  AlignLeftOutlined,
  FileTextOutlined,
  GlobalOutlined,
  PushpinOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Popover, Space, Switch, Tooltip } from 'antd';
import { useEffect } from 'react';

type FieldType = {
  m1: string;
  type: number;
  name: string;
  title: string;
  path: string;
  icon: string;
  component: string;
  isMenu: boolean;
  sortOrder: number;
  showAlways: boolean;
  status: number;
};
interface MyFormPropType {
  formType: number;
  formData?: IPermissionRes;
  setFormData?: Function;
}
const MyForm: React.FC<MyFormPropType> = ({ formType, formData }) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    // 在组件挂载后，将 formData 回显到表单中
    console.log(formData, 'formData');

    form.setFieldsValue(formData);
  }, [formData, form]);

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType> label='类型'>
        {formData?.type === -1 && (
          <span>
            <PushpinOutlined />
            顶部菜单
          </span>
        )}
        {formData?.type === 0 && (
          <span>
            <FileTextOutlined />
            页面菜单
          </span>
        )}
      </Form.Item>

      <Form.Item<FieldType> label='上级菜单' name='m1'>
        <div
          style={{
            display: 'flex'
          }}
        >
          <Input style={{ flex: 1, marginRight: 15 }} />
          <Popover placement='left' content={''} title='选择上级菜单'>
            <Button icon={<AlignLeftOutlined />}>选择菜单</Button>
          </Popover>
        </div>
      </Form.Item>

      <Form.Item<FieldType> label='名称' name='title' required>
        <Input
          addonAfter={
            <Popover placement='left' content='选择多语言' title='多语言'>
              <GlobalOutlined />
            </Popover>
          }
        />
      </Form.Item>

      {formType === 1 && (
        <Form.Item<FieldType> label='路径' name='path' required>
          <Input />
        </Form.Item>
      )}

      {formType === 1 && (
        <Form.Item<FieldType> label='路由英文名' name='name' required>
          <Input />
        </Form.Item>
      )}

      {formType === 0 && (
        <Form.Item<FieldType> label='英文名' name='name' required>
          <Input />
        </Form.Item>
      )}

      <Form.Item label='图标' required>
        <Form.Item<FieldType> name='icon' style={{ display: 'inline-block' }}>
          <Input name='icon' placeholder='输入图标名或选择图标' style={{ marginRight: 15 }} />
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }}>
          <Button icon={<AimOutlined />}>选择图标</Button>
        </Form.Item>
      </Form.Item>

      {formType === 1 && (
        <Form.Item<FieldType> label='前端组件' name='component' required>
          <Input />
        </Form.Item>
      )}

      {formType === 0 && (
        <Form.Item<FieldType> label='显示红点' name='component'>
          <Switch />
        </Form.Item>
      )}

      {formType === 0 && (
        <Form.Item<FieldType> label='系统站内菜单' name='isMenu'>
          <Switch checkedChildren='是' unCheckedChildren='否' />
        </Form.Item>
      )}

      <Form.Item<FieldType> label='排序值' name='sortOrder' required>
        <InputNumber min={0} />
      </Form.Item>

      {formType === 1 && (
        <Form.Item label='始终显示'>
          <Form.Item<FieldType> name='showAlways' style={{ display: 'inline-block' }}>
            <Switch checkedChildren='是' unCheckedChildren='否' style={{ marginRight: 10 }} />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
            <Tooltip
              placement='right'
              title='当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示此子级菜单，避免用户多次点击'
              arrow
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </Form.Item>
        </Form.Item>
      )}

      <Form.Item<FieldType> label='是否启用' name='status'>
        <Switch checkedChildren='启用' unCheckedChildren='禁用' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space size='middle'>
          <Button type='primary'>保存更改</Button>
          <Button>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default MyForm;

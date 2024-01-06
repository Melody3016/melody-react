import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Space,
  Switch,
  Tooltip
} from 'antd';
import { useState } from 'react';
import {
  AimOutlined,
  AlignLeftOutlined,
  GlobalOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import MyTree from './my-tree';

type FieldType = {
  m0: string;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  m7: string;
  m8: string;
  m9: string;
  m10: string;
  m11: string;
  m12: string;
};
const MenuTree: React.FC = () => {
  // 菜单类型
  const [menuType, setMenuType] = useState(2);
  // 当前编辑选择
  const [choose, setChoose] = useState('');
  const alertMsg = (
    <span>
      当前选择编辑：<span>{choose}</span>
      {choose && <a>取消选择</a>}
    </span>
  );
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={8}>
        <Alert type='info' showIcon message={alertMsg} style={{ marginBottom: 15 }} />
        <MyTree />
      </Col>
      <Col span={16}>
        <Form
          name='basic'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='类型'></Form.Item>

          <Form.Item<FieldType> label='上级菜单' name='m1'>
            <div
              style={{
                display: 'flex'
              }}
            >
              <Input style={{ flex: 1, marginRight: 15 }} />
              <Popover placement='left' content={<MyTree />} title='选择上级菜单'>
                <Button icon={<AlignLeftOutlined />}>选择菜单</Button>
              </Popover>
            </div>
          </Form.Item>

          <Form.Item<FieldType> label='名称' name='m2' required>
            <Input
              addonAfter={
                <Popover placement='left' content='选择多语言' title='多语言'>
                  <GlobalOutlined />
                </Popover>
              }
            />
          </Form.Item>

          {menuType === 2 && (
            <Form.Item<FieldType> label='路径' name='m9' required>
              <Input />
            </Form.Item>
          )}

          {menuType === 2 && (
            <Form.Item<FieldType> label='路由英文名' name='m10' required>
              <Input />
            </Form.Item>
          )}

          {menuType === 1 && (
            <Form.Item<FieldType> label='英文名' name='m3' required>
              <Input />
            </Form.Item>
          )}

          <Form.Item<FieldType> label='图标' name='m4' required>
            <div
              style={{
                display: 'flex'
              }}
            >
              <Input placeholder='输入图标名或选择图标' style={{ flex: 1, marginRight: 15 }} />

              <Button icon={<AimOutlined />}>选择图标</Button>
            </div>
          </Form.Item>

          {menuType === 2 && (
            <Form.Item<FieldType> label='前端组件' name='m11' required>
              <Input />
            </Form.Item>
          )}

          {menuType === 1 && (
            <Form.Item<FieldType> label='显示红点' name='m5'>
              <Switch />
            </Form.Item>
          )}

          {menuType === 1 && (
            <Form.Item<FieldType> label='系统站内菜单' name='m6'>
              <Switch checkedChildren='是' unCheckedChildren='否' />
            </Form.Item>
          )}

          <Form.Item<FieldType> label='排序值' name='m7' required>
            <InputNumber min={0} />
          </Form.Item>

          {menuType === 2 && (
            <Form.Item<FieldType> label='始终显示' name='m12'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Switch checkedChildren='是' unCheckedChildren='否' style={{ marginRight: 10 }} />
                <Tooltip
                  placement='right'
                  title='当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示此子级菜单，避免用户多次点击'
                  arrow
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
            </Form.Item>
          )}

          <Form.Item<FieldType> label='是否启用' name='m8'>
            <Switch checkedChildren='启用' unCheckedChildren='禁用' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space size='middle'>
              <Button type='primary'>保存更改</Button>
              <Button>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default MenuTree;

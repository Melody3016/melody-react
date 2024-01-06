import { useEffect, useState } from 'react';
import {
  AlignLeftOutlined,
  CaretDownOutlined,
  DeleteFilled,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  TableOutlined
} from '@ant-design/icons';
import { Button, Col, Dropdown, Input, MenuProps, Radio, Row, Space, Switch } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '刷新'
  },
  {
    key: '2',
    label: '收合所有'
  },
  {
    key: '3',
    label: '仅展开一级'
  },
  {
    key: '4',
    label: '仅展开两级'
  },
  {
    key: '5',
    label: '展开所有'
  }
];
interface MmOperateType {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
}
const MmOperate: React.FC<MmOperateType> = ({ mode, setMode }) => {
  // 级联与单选
  const [isCascade, setIsCascade] = useState(true);
  const onMenuClick: MenuProps['onClick'] = async e => {
    // 点击操作
    switch (e.key) {
      case '1':
        break;
      case '2':
        break;
      default:
        break;
    }
  };
  return (
    <Row justify='space-between' align='middle' style={{ marginBottom: 15 }}>
      {/* 左侧操作区 */}
      <Col>
        {mode === 'tree' && (
          <Space>
            <Button type='primary' icon={<PlusOutlined />}>
              添加子节点
            </Button>
            <Button icon={<PlusOutlined />}>添加顶部菜单</Button>
            <Button icon={<DeleteFilled />}>批量删除</Button>
            <Dropdown menu={{ items, onClick: onMenuClick }} placement='bottom' arrow>
              <Button>
                更多操作
                <CaretDownOutlined />
              </Button>
            </Dropdown>
            <Switch
              checkedChildren='级联'
              unCheckedChildren='单选'
              checked={isCascade}
              onChange={checked => setIsCascade(checked)}
            />
          </Space>
        )}
        {mode === 'table' && (
          <Space>
            <Button icon={<PlusOutlined />}>添加顶部菜单</Button>
            <Button icon={<DeleteFilled />}>批量删除</Button>
            <Button icon={<RedoOutlined rotate={260} />}>刷新</Button>
            <Input placeholder='输入菜单名搜索' addonAfter={<SearchOutlined />} />
          </Space>
        )}
      </Col>

      {/* 右侧切换区 */}
      <Col>
        <Radio.Group value={mode} onChange={e => setMode(e.target.value)}>
          <Radio.Button value='tree'>
            <AlignLeftOutlined />
          </Radio.Button>
          <Radio.Button value='table'>
            <TableOutlined />
          </Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
};
export default MmOperate;

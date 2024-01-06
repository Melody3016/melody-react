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
import { useEffect, useState } from 'react';
import {
  AimOutlined,
  AlignLeftOutlined,
  GlobalOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import MyTree from './my-tree';
import util from '@/libs/util';
import MyForm from './my-form';

interface MenuTreePropType {
  permissionData: IPermissionRes[];
}
const MenuTree: React.FC<MenuTreePropType> = ({ permissionData }) => {
  // 菜单类型
  const [formType, setFormType] = useState(0);
  // 当前编辑选择
  const [selectItem, setSelectItem] = useState({
    key: '',
    title: ''
  });
  // 表单数据
  const [formData, setFormData] = useState<IPermissionRes>();

  const alertMsg = (
    <Space wrap={true}>
      <span>当前选择编辑：</span>
      <span>{selectItem.title}</span>
      {selectItem.key && (
        <a
          onClick={e => {
            e.preventDefault();
            setSelectItem({ key: '', title: '' });
          }}
        >
          取消选择
        </a>
      )}
    </Space>
  );
  // 选中tree，设置表单数据
  useEffect(() => {
    const formItem = util.findOneOfItem(permissionData, selectItem.key);
    // 设置表格格式和数据
    setFormType(Number(formItem.level) || 0);
    setFormData(formItem);
  }, [selectItem]);

  return (
    <Row>
      <Col span={8}>
        <Alert type='info' showIcon message={alertMsg} style={{ marginBottom: 15 }} />
        <MyTree permissionData={permissionData} setSelectItem={setSelectItem} />
      </Col>
      <Col span={16}>
        <MyForm formType={formType} formData={formData} />
      </Col>
    </Row>
  );
};
export default MenuTree;

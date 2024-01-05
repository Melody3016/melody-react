import { Button, Col, Dropdown, MenuProps, Modal, Row, Space, Input, message } from 'antd';
import { CaretDownOutlined, DeleteOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModalExport from './modal-export';
import useAxios from '@/hooks/useAxios';
import { getAllUserData } from '@/api';
import excel from '@/libs/excel';
import { exportColumnType } from './exportColumn';
import DrawerImport from './drawer-import';

const items = [
  {
    key: '1',
    label: '导出全部数据'
  },
  {
    key: '2',
    label: '导入数据'
  }
];
interface TableOperateProps {
  total: number;
  onImportSuccess: () => void;
}
const TableOperate: React.FC<TableOperateProps> = ({ total, onImportSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [exportData, setExportData] = useState<IUserListRes>();
  const { fetchData } = useAxios();

  const onMenuClick: MenuProps['onClick'] = async e => {
    // 导出全部数据
    if (e.key === '1') {
      // 获取全部数据
      const res = await fetchData(getAllUserData);
      if (!res) {
        message.error('获取全部用户数据失败,请稍后重试!');
        return;
      }
      setExportData(res);
      setIsModalOpen(true);
    } else if (e.key === '2') {
      // 导入数据
      setIsDrawerOpen(true);
    }
  };
  // 导出全部用户数据
  const handleSubmit = (
    filename: string,
    columnCheckValues: string[],
    columnOptions: exportColumnType[]
  ) => {
    // 构造数据
    const title: string[] = [];
    columnCheckValues.forEach(key => {
      const element = columnOptions.find(item => item.value === key);
      element && title.push(element.label);
    });
    const params = {
      title,
      key: columnCheckValues,
      data: exportData,
      autoWidth: true,
      filename
    };
    excel.exportJsonToExcel(params);
    setIsModalOpen(false);
  };

  return (
    <>
      <Row justify='space-between' align='middle' style={{ marginBottom: 15 }}>
        {/* 按钮区 */}
        <Col>
          <Space>
            <Button type='primary' icon={<PlusOutlined />}>
              添加用户
            </Button>
            <Button icon={<DeleteOutlined />}>批量删除</Button>
            <Dropdown menu={{ items, onClick: onMenuClick }} placement='bottom' arrow>
              <Button>
                更多操作
                <CaretDownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>
        {/* 操作区 */}
        <Col>
          <RedoOutlined rotate={260} />
        </Col>
      </Row>
      <ModalExport
        title={`确认导出全部 ${total} 条数据?`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />
      <DrawerImport
        title='导入数据'
        placement='right'
        width={640}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        onImportSuccess={onImportSuccess}
      />
    </>
  );
};
export default TableOperate;

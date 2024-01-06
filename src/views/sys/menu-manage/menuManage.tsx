import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import MmOperate from './mmOperate';
import style from './menu-manage.scss';
import MyTable from '@/views/my-components/origin/my-table';
import { menuManageColumn } from '@/libs/tableColumns';
import useMenuState from './useMenuState';

const MenuManage: React.FC = () => {
  // 切换模式
  const [mode, setMode] = useState<ModeType>('tree');
  // 表格数据
  const { permissionData, getPermissionData } = useMenuState();

  useEffect(() => {
    getPermissionData();
  }, []);
  return (
    <div className={style.menuManage}>
      <Card>
        {/* Operate组件 */}
        <MmOperate mode={mode} setMode={setMode} />
        {/* Tree组件 */}
        {mode === 'tree' && <div>Tree</div>}
        {/* Table组件 */}
        {mode === 'table' && (
          <MyTable
            bordered
            rowSelection={{}}
            dataSource={permissionData}
            columns={menuManageColumn}
            pagination={false}
            scroll={{
              x: 1500
            }}
            expandable={{
              // expandIcon: () => <PlusSquareOutlined />,
              indentSize: 50,
              expandRowByClick: true
            }}
          />
        )}
      </Card>
    </div>
  );
};
export default MenuManage;

import { useEffect, useState } from 'react';
import { Card } from 'antd';
import MmOperate from './mmOperate';
import style from './menu-manage.scss';
import MyTable from '@/views/my-components/origin/my-table';
import { menuManageColumn } from '@/libs/tableColumns';
import useMenuState from './useMenuState';
import MenuTree from './menu-tree';

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
      <Card style={{ minWidth: 620 }}>
        {/* Operate组件 */}
        <MmOperate mode={mode} setMode={setMode} />
        {/* Tree组件 */}
        {mode === 'tree' && <MenuTree />}
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

import { useEffect, useState } from 'react';
import { Avatar, Badge, Card, Divider, Tag, message } from 'antd';
import style from './user-manage.scss';
import MyTable from '@/views/my-components/origin/my-table';
import useUserState from './useUserState';
import TableOperate from '@/views/my-components/origin/table-operate';
import { userManageColumns } from '@/libs/tableColumns';

const UserManage: React.FC = () => {
  // 获取用户列表数据
  const { isLoading, total, userData, getUserData } = useUserState();
  const [searchObj, setSearchObj] = useState<IUserListParam>({
    nickname: '',
    mobile: '',
    email: '',
    sex: '',
    username: '',
    id: '',
    departmentId: '',
    type: undefined,
    status: undefined,
    pageNumber: 1,
    pageSize: 10,
    sort: 'createTime',
    order: 'desc',
    startDate: '',
    endDate: ''
  });
  // 分页改变
  const handlePageChange = (pageNumber: number, pageSize: number) => {
    // 改变页码和每页条数，重新获取数据
    setSearchObj(prevState => {
      const updatedSearchObj = { ...prevState, pageNumber, pageSize };
      getUserData(updatedSearchObj); // 在回调函数中调用 getUserData
      return updatedSearchObj; // 返回新的 searchObj
    });
  };

  // 成功导入数据
  const importData = () => {
    message.success('数据导入成功!');
    getUserData(searchObj);
  };

  useEffect(() => {
    getUserData(searchObj);
  }, []);
  return (
    <div className={style.userManage}>
      <Card>
        {/* TableSearch组件 */}
        {/* TableOperate组件 */}
        <TableOperate total={total} onImportSuccess={importData} />
        {/* Table组件 */}
        <MyTable
          bordered
          loading={isLoading}
          columns={userManageColumns}
          dataSource={userData}
          rowSelection={{}}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 1500
          }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            onChange: handlePageChange,
            showTotal: (total: number) => `共 ${total} 条`
          }}
        />
      </Card>
    </div>
  );
};
export default UserManage;

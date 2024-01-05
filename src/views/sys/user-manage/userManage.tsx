import { useEffect, useState } from 'react';
import { Avatar, Badge, Card, Divider, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import style from './user-manage.scss';
import MyTable from '@/views/my-components/origin/my-table';
import useUserState from './useUserState';
import TableOperate from '@/views/my-components/origin/table-operate';
import { getStore } from '@/libs/storage';

const columns: ColumnsType<IUserInfoRes> = [
  {
    title: '#',
    width: 60,
    fixed: 'left',
    align: 'center',
    render: (_, __, index) => index + 1
  },
  {
    title: '登录账号',
    width: 125,
    dataIndex: 'username',
    key: 'username',
    fixed: 'left',
    sorter: (a: IUserInfoRes, b: IUserInfoRes) => a.username.length - b.username.length
  },
  {
    title: '用户名',
    width: 125,
    dataIndex: 'nickname',
    key: 'nickname',
    fixed: 'left',
    sorter: (a: IUserInfoRes, b: IUserInfoRes) => a.nickname.length - b.nickname.length
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
    align: 'center',
    render: text => <Avatar src={text} />
  },
  {
    title: '所属部门',
    dataIndex: 'departmentId',
    key: 'departmentId',
    width: 120,
    render: (_, record) => record.departmentTitle
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 125,
    sorter: (a: IUserInfoRes, b: IUserInfoRes) => a.mobile.length - b.mobile.length,
    render: text => {
      if (!getStore('roles')?.includes('ROLE_ADMIN')) {
        return '您无权查看此数据';
      }
      return text;
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 180,
    sorter: (a: IUserInfoRes, b: IUserInfoRes) => a.email.length - b.email.length
  },
  { title: '性别', dataIndex: 'sex', key: 'sex', width: 65 },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 110,
    filters: [
      {
        text: '普通用户',
        value: 0
      },
      {
        text: '管理员',
        value: 1
      }
    ],
    filterMultiple: false,
    onFilter: (value: any, record: IUserInfoRes) => record.type === value,
    render: text => {
      let element;
      if (text === 0) {
        element = <Tag color='default'>普通用户</Tag>;
      } else {
        element = <Tag color='processing'>管理员</Tag>;
      }
      return element;
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 100,
    filters: [
      {
        text: '启用',
        value: 0
      },
      {
        text: '禁用',
        value: -1
      }
    ],
    filterMultiple: false,
    onFilter: (value: any, record: IUserInfoRes) => record.status === value,
    render: text => {
      let element;
      if (text === 0) {
        element = <Badge status='success' text='启用' />;
      } else {
        element = <Badge status='error' text='禁用' />;
      }
      return element;
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
    defaultSortOrder: 'descend',
    sorter: (a: IUserInfoRes, b: IUserInfoRes) => a.createTime.length - b.createTime.length
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 170,
    render: () => (
      <>
        <a>编辑</a>
        <Divider type='vertical' />
        <a>禁用</a>
        <Divider type='vertical' />
        <a>删除</a>
      </>
    )
  }
];

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
          columns={columns}
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

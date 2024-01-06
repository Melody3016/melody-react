import { Avatar, Badge, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getStore } from './storage';

export const userManageColumns: ColumnsType<IUserInfoRes> = [
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
export const menuManageColumn: ColumnsType<IPermissionRes> = [
  {
    title: '',
    width: 30,
    fixed: 'left',
    align: 'center'
  },
  {
    title: '#',
    width: 60,
    fixed: 'left',
    align: 'center',
    render: (_, __, index) => index + 1
  },
  {
    title: '菜单名称',
    key: 'title',
    dataIndex: 'title',
    width: 150,
    sorter: true
  },
  {
    title: '英文名',
    key: 'name',
    dataIndex: 'name',
    width: 100,
    sorter: true
  },
  {
    title: '类型',
    key: 'type',
    width: 120,
    sorter: true,
    align: 'center',
    render: (_, record) => {
      let type = '';
      switch (record.level) {
        case 0:
          type = '顶部菜单';
          break;
        case 1:
          type = '页面菜单';
          break;
        case 2:
          type = '页面菜单';
          break;
        case 3:
          type = '操作按钮';
          break;
        default:
          break;
      }
      return <span>{type}</span>;
    }
  },
  {
    title: '图标',
    key: 'icon',
    dataIndex: 'icon',
    width: 100,
    sorter: true,
    align: 'center'
  },
  {
    title: '路径/URL',
    width: 100,
    key: 'path',
    dataIndex: 'path'
    // tooltip: true
  },
  {
    title: '排序',
    key: 'sortOrder',
    dataIndex: 'sortOrder',
    width: 100,
    sorter: true,
    align: 'center',
    sortOrder: 'ascend'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    sorter: true,
    width: 170
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    align: 'center',
    render: () => (
      <div>
        <a>添加子节点</a>
        <Divider type='vertical' />
        <a>删除</a>
      </div>
    )
  }
];

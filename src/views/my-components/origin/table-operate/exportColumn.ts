export interface exportColumnType {
  label: string;
  value: string;
  disabled?: boolean;
}
export const exportColumn: exportColumnType[] = [
  {
    label: '用户名',
    value: 'username'
  },
  {
    label: '头像',
    value: 'avatar'
  },
  {
    label: '所属部门ID',
    value: 'departmentId'
  },
  {
    label: '所属部门',
    value: 'departmentTitle'
  },
  {
    label: '手机',
    value: 'mobile',
    disabled: true
  },
  {
    label: '邮箱',
    value: 'email'
  },
  {
    label: '性别',
    value: 'sex'
  },
  {
    label: '地址',
    value: 'address'
  },
  {
    label: '用户类型',
    value: 'type'
  },
  {
    label: '状态',
    value: 'status'
  },
  {
    label: '删除标志',
    value: 'delFlag'
  },
  {
    label: '创建时间',
    value: 'createTime'
  },
  {
    label: '更新时间',
    value: 'updateTime'
  }
];

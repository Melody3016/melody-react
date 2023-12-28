// 登录
interface ILoginParam {
  code: string;
  mobile?: string;
  username?: string;
  password?: string;
  captchaId?: string;
  saveLogin?: boolean;
}

// 注册
interface IRegisterParam {
  username: string;
  email: string;
  password: string;
  mobile: string;
  code: string;
  passStrength: string;
}

// 重置密码
interface IResetParam {
  password: string;
  code: string;
  passStrength: string;
  mobile?: string;
  email?: string;
}

// 短信验证码
interface ISmsParam {
  mobile: string;
  captchaId?: string;
  code?: string;
  type?: number;
}
// 邮箱验证码
interface IEmailParam {
  email: string;
  captchaId?: string;
  code?: string;
}
// 条件查询用户列表
interface IUserListParam {
  // 省市县地址
  address?: string;
  // 用户头像
  avatar?: string;
  // 生日(date-time)
  birth?: string;
  // 创建者
  createBy?: string;
  // 创建时间(date-time)
  createTime?: string;
  // 导入数据时使用
  defaultRole?: number;
  // 删除标志 默认0
  delFlag?: number;
  // 所属部门id
  departmentId?: string;
  // 所属部门名称
  departmentTitle?: string;
  // 描述/详情/备注
  description?: string;
  // 邮箱
  email?: string;
  // 结束日期
  endDate?: string;
  // 唯一标识
  id?: string;
  // 手机
  mobile?: string;
  // 用户名/昵称/姓名
  nickname?: string;
  // 排序方式 asc/desc
  order?: string;
  // 页码
  pageNumber?: number;
  // 每页显示条数
  pageSize?: number;
  // 密码强度
  passStrength?: string;
  // 密码
  password?: string;

  // 页面路径/资源链接url
  // permissions[0].path?: string
  // 菜单标题
  // permissions[0].title?: string
  // 备注
  // roles[0].description?: string
  // id
  // roles[0].id?: string
  // 角色名 以ROLE_开头
  // roles[0].name?: string

  // 性别
  sex?: string;
  // 排序字段
  sort?: string;
  // 起始日期
  startDate?: string;
  // 状态 默认0正常 -1拉黑
  status?: number;
  // 街道地址
  street?: string;
  // 用户类型 0普通用户 1管理员
  type?: number;
  // 更新者
  updateBy?: string;
  // 更新时间(date-time)
  updateTime?: string;
  // 登录名
  username?: string;
}

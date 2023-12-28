// 统一请求路径前缀在api/axios.js中修改
import { getRequest, postRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios';

const xbootUrl = '/xboot';
// const myWebUrl = "my-web"

// 文件上传接口
export const uploadFile = `${xbootUrl}/upload/file`;

// 验证码渲染图片接口
export const drawCodeImage = `${xbootUrl}/common/captcha/draw/`;

// 通知提醒框
export const noticeReq = () => {
  return getNoAuthRequest<IData<INoticeRes>>('/setting/notice');
};

// 获取验证码
export const initCaptcha = () => {
  return getNoAuthRequest<IData<string>>('/common/captcha/init');
};

// 获取登录二维码url
export const getLoginQRCode = () => {
  return getNoAuthRequest<IData<string>>('/auth/getLoginQRCode');
};

// 检查二维码状态
export const checkQRStatus = (checkToken: string) => {
  return getNoAuthRequest<IData<ICheckQRStatusRes>>(`/auth/checkQRStatus/${checkToken}`);
};

// 登陆
export const loginReq = (params: ILoginParam) => {
  return postNoAuthRequest<IData<string>>('/auth/login', params);
};

// 发送短信验证码
/**
 type :
   1 发送登录验证码
   2 发送注册验证码
   3 发送重置密码验证码
 */
export const sendSms = (params: ISmsParam) => {
  let url = '/common/captcha/';
  const { type, mobile } = params;
  if (type === 1) {
    // 登录验证码
    url += `sendLoginSms/${mobile}`;
  } else if (type === 2) {
    // 注册验证码
    url += `sendRegistSms/${mobile}`;
  } else if (type === 3) {
    // 重置密码验证码
    url += `sendResetSms/${mobile}`;
  }
  // return getNoAuthRequest<IData<string>>(url, {
  //   captchaId: params.captchaId,
  //   code: params.code
  // });
  return getNoAuthRequest<IData<string>>(url);
};

// 通过手机重置密码
export const resetByMobile = (params: IResetParam) => {
  return postNoAuthRequest<IData<string>>('/auth/resetByMobile', params);
};
// 发送重置密码邮件验证码
export const sendResetEmail = (params: IEmailParam) => {
  return getNoAuthRequest<IData<string>>(`/email/sendResetCode/${params.email}`, {
    captchaId: params.captchaId,
    code: params.code
  });
};
// 通过邮件重置密码
export const resetByEmail = (params: IResetParam) => {
  return postNoAuthRequest<IData<string>>('/auth/resetByEmail', params);
};

// 短信验证码登录
export const smsLogin = (params: ILoginParam) => {
  return postNoAuthRequest<IData<string>>('/auth/smsLogin', params);
};

// 注册
export const registerReq = (params: IRegisterParam) => {
  return postNoAuthRequest<IData<object>>('/auth/register', params);
};

// 获取菜单信息
export const getMenuList = () => {
  return getRequest<IData<IMenuListRes[]>>('/permission/getMenuList', null);
};

// 获取vaptcha配置
export const getOtherSet = () => {
  return getRequest<IData<IOtherSetRes>>('/setting/other', null);
};

// 获取用户登录信息
export const userInfo = () => {
  return getRequest<IData<IUserInfoRes>>('/user/info', null);
};
// 获取全部角色数据
export const getAllRoleList = () => {
  return getRequest('/role/getAllList', null);
};
// 添加用户
export const addUser = (params: IUserInfoRes) => {
  return postRequest<IData<{}>>('/user/admin/add', params);
};
// 删除用户
export const deleteUser = (params: { ids: string }) => {
  return postRequest<IData<{}>>('/user/delByIds', params);
};

// 获取用户数据 多条件
export const getUserListData = (params: IUserListParam) => {
  return getRequest<IData<IUserListRes>>('/user/getByCondition', params);
};

// 获取一级部门
export const initDepartment = (params?: { openDataFilter?: boolean }) => {
  return getRequest<IData<IDepRes[]>>('/department/getByParentId/0', params || null);
};
// 加载部门子级数据
export const loadDepartment = (
  id: string,
  params?: {
    openDataFilter?: boolean;
  }
) => {
  return getRequest<IData<IDepRes[]>>(`/department/getByParentId/${id}`, params || null);
};

// 搜索部门
export const searchDepartment = (params: { title: string; openDataFilter?: boolean }) => {
  return getRequest<IData<IDepRes[]>>('/department/search', params);
};

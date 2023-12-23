import axios from 'axios';

import type { AxiosError, AxiosResponse } from 'axios';
import { message as Message } from 'antd';
import { getStore } from './storage';

// 创建axios实例并封装
const instance = axios.create({
  baseURL: '/xboot',
  timeout: 15000
});
// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  (err: AxiosError) => {
    Message.error(err.message);
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<IData>): any => {
    // const { code, message } = response.data;
    // // 根据返回的code值来做不同的处理(和后端约定)
    // switch (code) {
    //   case 302:
    //     break;
    //   case 401:
    //     // 未登录 清除已登录状态
    //     Cookies.set('userInfo', '');
    //     setStore('accessToken', '');
    //     if (location.pathname !== 'login') {
    //       if (message !== null) {
    //         Message.error(message);
    //       } else {
    //         Message.error('未知错误，请重新登录');
    //       }
    //       navigate('/login');
    //     }
    //     break;
    //   case 403:
    //     // 没有权限
    //     if (message !== null) {
    //       Message.error(message);
    //     } else {
    //       Message.error('未知错误');
    //     }
    //     break;
    //   case 500:
    //     // 错误
    //     if (message !== null) {
    //       Message.error(message);
    //     } else {
    //       Message.error('未知错误');
    //     }
    //     break;
    //   default:
    //     return response.data;
    // }
    return response.data;
  },
  (err: AxiosError) => {
    // 返回状态码不为200时候的错误处理
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = err.response?.status;
    switch (status) {
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }
    Message.error(message);
    return Promise.reject(err);
  }
);

// 需要携带token的请求
export const getRequest = <R>(
  url: string,
  params: { [key: string]: any } | URLSearchParams | null
) => {
  // 读取本地存储的token
  const accessToken = getStore('accessToken');
  return instance<any, R>({
    url,
    method: 'get',
    params,
    headers: {
      accessToken
    }
  });
};
export const postRequest = <R>(url: string, params: { [key: string]: any }) => {
  // 读取本地存储的token
  const accessToken = getStore('accessToken');
  return instance<any, R>({
    method: 'post',
    url,
    data: params,
    transformRequest: [
      data => {
        let ret = '';
        for (const [key, value] of Object.entries(data)) {
          ret += `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}&`;
        }
        ret = ret.substring(0, ret.length - 1);
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accessToken
    }
  });
};
export const putRequest = <R>(url: string, params: { [key: string]: any }) => {
  // 读取本地存储的token
  const accessToken = getStore('accessToken');
  return instance<any, R>({
    method: 'put',
    url,
    data: params,
    transformRequest: [
      data => {
        let ret = '';
        for (const [key, value] of Object.entries(data)) {
          ret += `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}&`;
        }
        ret = ret.substring(0, ret.length - 1);
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accessToken
    }
  });
};
export const postBodyRequest = <R>(url: string, params: FormData | File | Blob) => {
  // 读取本地存储的token
  const accessToken = getStore('accessToken');
  return instance<any, R>({
    url,
    method: 'post',
    params,
    headers: {
      accessToken
    }
  });
};

// 无需token验证的请求 避免旧token过期导致请求失败
export const getNoAuthRequest = <R>(
  url: string,
  params?: { [key: string]: any } | URLSearchParams
) => {
  return instance<any, R>({
    method: 'get',
    url,
    params
  });
};

export const postNoAuthRequest = <R>(url: string, params: { [key: string]: any }) => {
  return instance<any, R>({
    method: 'post',
    url,
    data: params,
    transformRequest: [
      data => {
        let ret = '';
        for (const [key, value] of Object.entries(data)) {
          ret += `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}&`;
        }
        ret = ret.substring(0, ret.length - 1);
        return ret;
      }
    ]
  });
};

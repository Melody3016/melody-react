import axios from 'axios';
import qs from 'qs';
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

const cacheMap = new Map();
// 存储缓存当前状态，相当于挂牌子的地方
const statusMap = new Map<string, 'pending' | 'complete'>();
// 定义一下回调的格式
interface RequestCallback {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}
// 存放等待状态的请求回调
const callbackMap = new Map<string, RequestCallback[]>();

// 这里用params是因为params是 GET 方式穿的参数，我们的缓存一般都是 GET 接口用的
function generateCacheKey(url: string, params?: { [key: string]: any } | URLSearchParams | null) {
  return `${url}?${qs.stringify(params)}`;
}

export const getNoAuthRequestCache = <R>(
  url: string,
  params?: { [key: string]: any } | URLSearchParams | null,
  needCache = true
) => {
  const cacheKey = generateCacheKey(url, params);
  // 判断是否需要缓存，并且缓存池中有值时，返回缓存池中的值
  // 判断是否需要缓存
  if (needCache) {
    if (statusMap.has(cacheKey)) {
      const currentStatus = statusMap.get(cacheKey);

      // 判断当前的接口缓存状态，如果是 complete ，则代表缓存完成
      if (currentStatus === 'complete') {
        return Promise.resolve(cacheMap.get(cacheKey));
      }

      // 如果是 pending ，则代表正在请求中，这里就等个三秒，然后再来一次看看情况
      if (currentStatus === 'pending') {
        return new Promise((resolve, reject) => {
          if (callbackMap.has(cacheKey)) {
            callbackMap.get(cacheKey)!.push({
              onSuccess: resolve,
              onError: reject
            });
          } else {
            callbackMap.set(cacheKey, [
              {
                onSuccess: resolve,
                onError: reject
              }
            ]);
          }
        });
      }
    }
    statusMap.set(cacheKey, 'pending');
  }
  return instance<any, R>({
    method: 'get',
    url,
    params
  }).then(res => {
    statusMap.set(cacheKey, 'complete');
    cacheMap.set(cacheKey, res);
    // 这里触发resolve的回调函数
    if (callbackMap.has(cacheKey)) {
      callbackMap.get(cacheKey)!.forEach(callback => {
        callback.onSuccess(res);
      });
      // 调用完成之后清掉，用不到了
      callbackMap.delete(cacheKey);
    }
    return res;
  });
};

export const getRequestCache = <R>(
  url: string,
  params?: { [key: string]: any } | URLSearchParams | null,
  needCache = true
): Promise<R> => {
  // 读取本地存储的token
  const accessToken = getStore('accessToken');
  const cacheKey = generateCacheKey(url, params);
  // 判断是否需要缓存，并且缓存池中有值时，返回缓存池中的值
  // 判断是否需要缓存
  if (needCache) {
    if (statusMap.has(cacheKey)) {
      const currentStatus = statusMap.get(cacheKey);

      // 判断当前的接口缓存状态，如果是 complete ，则代表缓存完成
      if (currentStatus === 'complete') {
        return Promise.resolve(cacheMap.get(cacheKey));
      }

      // 如果是 pending ，则代表正在请求中，这里就等个三秒，然后再来一次看看情况
      if (currentStatus === 'pending') {
        return new Promise((resolve, reject) => {
          if (callbackMap.has(cacheKey)) {
            callbackMap.get(cacheKey)!.push({
              onSuccess: resolve,
              onError: reject
            });
          } else {
            callbackMap.set(cacheKey, [
              {
                onSuccess: resolve,
                onError: reject
              }
            ]);
          }
        });
      }
    }
    statusMap.set(cacheKey, 'pending');
  }
  return instance<any, R>({
    method: 'get',
    url,
    params,
    headers: {
      accessToken
    }
  }).then(res => {
    statusMap.set(cacheKey, 'complete');
    cacheMap.set(cacheKey, res);
    // 这里触发resolve的回调函数
    if (callbackMap.has(cacheKey)) {
      callbackMap.get(cacheKey)!.forEach(callback => {
        callback.onSuccess(res);
      });
      // 调用完成之后清掉，用不到了
      callbackMap.delete(cacheKey);
    }
    return res;
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

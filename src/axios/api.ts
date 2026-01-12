import instance from './instance';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 封装GET请求
 */
const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.get(url, { ...config, params })
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        throw error.response.data;
      } else {
        // 其他错误（如网络错误）
        throw error;
      }
    });
};

/**
 * 封装POST请求
 */
const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.post(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        throw error.response.data;
      } else {
        // 其他错误（如网络错误）
        throw error;
      }
    });
};

/**
 * 封装PUT请求
 */
const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.put(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        throw error.response.data;
      } else {
        // 其他错误（如网络错误）
        throw error;
      }
    });
};

/**
 * 封装DELETE请求
 */
const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.delete(url, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        throw error.response.data;
      } else {
        // 其他错误（如网络错误）
        throw error;
      }
    });
};

/**
 * 封装PATCH请求
 */
const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.patch(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        throw error.response.data;
      } else {
        // 其他错误（如网络错误）
        throw error;
      }
    });
};

export default {
  get,
  post,
  put,
  del,
  patch,
};
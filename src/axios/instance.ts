import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { message } from 'antd';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void, reject: (reason?: any) => void }> = [];

const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// 请求拦截器：添加token到请求头
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 构造完整的URL用于判断
        const fullUrl = `${config.baseURL || baseURL}${config.url}`;
        console.log('完整的url ===\n', fullUrl);
        // 如果是登录请求则跳过添加token
        if (config.url?.includes('/login')) {
            return config;
        }

        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 刷新token的辅助函数
const handleTokenRefresh = async (originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }) => {
    if (!originalRequest._retry) {
        if (isRefreshing) {
            // 如果正在刷新token，则将请求加入等待队列
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                })
                .catch(err => {
                    throw err;
                });
        }

        originalRequest._retry = true;

        // 开始刷新token
        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // 创建一个新的axios实例专门用于刷新token，避免递归调用
            const refreshInstance = axios.create({
                baseURL,
            });

            // 发起刷新token的请求
            const response = await refreshInstance.post('/refresh-token', {
                refresh_token: refreshToken
            }, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            const { access_token, refresh_token: newRefreshToken } = response.data;

            // 更新本地存储中的token
            localStorage.setItem('access_token', access_token);
            if (newRefreshToken) {
                localStorage.setItem('refresh_token', newRefreshToken);
            }

            // 更新原始请求的header
            originalRequest.headers.Authorization = `Bearer ${access_token}`;

            // 处理等待队列中的请求
            processQueue(null, access_token);

            // 重新发起原始请求
            return instance(originalRequest);
        } catch (refreshError) {
            // 刷新失败，清空所有token并跳转到登录页
            processQueue(refreshError, null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // 跳转到登录页面或执行其他操作
            globalThis.location.href = '/login';

            throw refreshError;
        } finally {
            isRefreshing = false;
        }
    }
};

// 响应拦截器：处理token过期和自动刷新
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 统一处理成功的响应
        return response;
    },
    async (error) => {
        // 统一处理错误响应
        if (error.response) {
            // 获取响应状态码
            const status = error.response.status;
            const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = error.config;

            // 根据不同状态码进行不同的处理
            switch (status) {
                case 401:
                    console.log(error);

                    // 认证失败，可能是token无效或过期
                    if (originalRequest.url?.includes('/login')) {
                        // 登录请求本身的401错误，直接显示错误信息
                        const errorMessage = error.response.data?.message || '用户名或密码错误';
                        message.error(errorMessage);
                        
                        // 不做额外处理，让调用方自行处理错误
                        throw error;
                    }
                    
                    // 对于其他请求的401错误，尝试刷新token
                    return handleTokenRefresh(originalRequest);
                case 403:
                    // token过期或权限不足，尝试刷新token
                    return handleTokenRefresh(originalRequest);
                default:
                    // 其他错误使用message弹错错误信息
                    message.error(error.response.data?.message || `请求失败，状态码: ${error.response.status}`);
            }
        } else if (error.request) {
            // 请求已发出但没有收到响应
            message.error('网络连接错误');
        } else {
            // 其他错误
            message.error('请求配置错误');
        }

        // 抛出错误，让调用方可以进一步处理
        throw error;
    }
);

export default instance;
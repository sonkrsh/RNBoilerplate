import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config';
import notificationService from './notificationService';

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    if (config.headers && __DEV__) {
      console.log('🚀 Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
      });
    }
    return config;
  },
  error => {
    if (__DEV__) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log('✅ Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'Something went wrong',
      status: error.response?.status,
      data: error.response?.data,
    };

    if (__DEV__) {
      console.error('❌ Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    if (error.response?.status === 401) {
      apiError.message = 'Unauthorized access';
    } else if (error.response?.status === 403) {
      apiError.message = 'Forbidden access';
    } else if (error.response?.status === 404) {
      apiError.message = 'Resource not found';
    } else if ((error.response?.status ?? 0) >= 500) {
      apiError.message = 'Server error occurred';
    }

    // Show global notification for API errors
    const endpoint = error.config?.url;
    notificationService.handleApiError(apiError, endpoint);

    return Promise.reject(apiError);
  },
);

export default axiosInstance;

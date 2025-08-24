import axiosInstance, {ApiError} from './axiosInstance';
import config from '../config';

export class ApiService {
  private static retryRequest = async (
    fn: () => Promise<any>,
    retries: number = config.RETRY_ATTEMPTS,
  ): Promise<any> => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && (error as ApiError).status! >= 500) {
        console.log(`Retrying request. Attempts left: ${retries - 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ApiService.retryRequest(fn, retries - 1);
      }
      throw error;
    }
  };

  static async get<T>(url: string): Promise<T> {
    return ApiService.retryRequest(async () => {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    });
  }

  static async post<T>(url: string, data?: any): Promise<T> {
    return ApiService.retryRequest(async () => {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    });
  }

  static async put<T>(url: string, data?: any): Promise<T> {
    return ApiService.retryRequest(async () => {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    });
  }

  static async delete<T>(url: string): Promise<T> {
    return ApiService.retryRequest(async () => {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    });
  }
}

export default ApiService;
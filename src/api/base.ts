import axios, { AxiosInstance } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';

let axiosInstance: AxiosInstance;

axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': null,
  },
});

axiosRetry(axiosInstance, {
  retries: 2,
  retryDelay: exponentialDelay,
});

export default axiosInstance;

export async function get(url: string, options?: any): Promise<any> {
  try {
    const response = await axiosInstance.get(url, {
      ...options,
      headers: {},
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

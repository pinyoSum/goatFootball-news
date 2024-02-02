import axios, {  AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private apiInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.apiInstance = axios.create(config);
    
    // เพิ่ม interceptors
    this.apiInstance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    // ที่นี่คุณสามารถแก้ไขหรือ log ข้อมูลที่ต้องการจาก response ก่อนส่งต่อ
    return response;
  }

  private handleError(error: AxiosError): Promise<void> {
    // ที่นี่คุณสามารถจัดการ errors ดังต้องการ, เช่น logging หรือแสดงข้อความเตือน
    console.error("API Error:", error.response?.data);  // แสดงข้อผิดพลาดที่ได้รับจาก API
    return Promise.reject(error);
  }

  get instance(): AxiosInstance {
    return this.apiInstance;
  }
}

const BASE_URL = 'https://apiball.vip';
const TIMEOUT = 100000;
const HEADERS = {
  'Content-Type': 'application/json',
};

const apiService = new ApiService({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: HEADERS,
});

export default apiService.instance;

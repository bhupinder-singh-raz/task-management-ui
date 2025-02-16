import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const REFRESH_TOKEN_URL = "/auth/refresh-token";
export const SIGNUP_URL = "/auth/signup";
export const SIGNIN_URL = "/auth/signin";
export const TASK_URL = "/tasks";

class AxiosService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedRequestsQueue: AxiosRequestConfig[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      withCredentials: true,
    });
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "Unauthorized"
        ) {
          const originalRequest: AxiosRequestConfig = error.config;
  
          if (!this.isRefreshing) {
            this.isRefreshing = true;
  
            try {
              await this.refreshAccessToken();
              this.failedRequestsQueue.map((request) => this.axiosInstance(request));
              this.failedRequestsQueue = [];
              return this.axiosInstance(originalRequest);
            } catch (refreshError) {
              window.location.href = "/signin";
              this.failedRequestsQueue = [];
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          }
  
          // If already refreshing, queue this request
          return new Promise((resolve) => {
            this.failedRequestsQueue.push(originalRequest);
            resolve(null);
          });
        }
  
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<void> {
    await this.axiosInstance.post(REFRESH_TOKEN_URL, {}, { withCredentials: true });
  }

  // Helper method to handle response data
  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  // Helper method to handle errors
  private handleError(error: any): Promise<never> {
    return Promise.reject(error);
  }

  // HTTP GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP PUT request
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export default AxiosService;

import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Types
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Api {
  protected navigate = (url: string) => window.location.assign(url);
  private readonly baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  private axiosInstance: AxiosInstance;

  constructor(endpointPrefix: string = '') {
    this.axiosInstance = axios.create({
      baseURL: `${this.baseURL}/api/${endpointPrefix}`,
    });
  }

  protected get = async (
    url: string,
    config?: AxiosRequestConfig,
    toastError?: boolean
  ): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(url, config);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error, toastError);
      } else {
        console.error('Unknown error:', error);
        if (typeof window !== 'undefined') {
          toast.error('An unknown error occurred. Please try again later.');
        }
      }
      throw error;
    }
  };

  protected post = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    toastError?: boolean
  ): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(url, data, config);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error, toastError);
      } else {
        console.error('Unknown error:', error);
        if (typeof window !== 'undefined') {
          toast.error('An unknown error occurred. Please try again later.');
        }
      }
      throw error;
    }
  };

  protected patch = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    toastError?: boolean
  ): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await this.axiosInstance.patch(url, data, config);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error, toastError);
      } else {
        console.error('Unknown error:', error);
        if (typeof window !== 'undefined') {
          toast.error('An unknown error occurred. Please try again later.');
        }
      }
      throw error;
    }
  };

  protected put = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    toastError?: boolean
  ): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await this.axiosInstance.put(url, data, config);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error, toastError);
      } else {
        console.error('Unknown error:', error);
        if (typeof window !== 'undefined') {
          toast.error('An unknown error occurred. Please try again later.');
        }
      }
      throw error;
    }
  };

  protected delete = async (
    url: string,
    config?: AxiosRequestConfig,
    toastError?: boolean
  ): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await this.axiosInstance.delete(url, config);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error, toastError);
      } else {
        console.error('Unknown error:', error);
        if (typeof window !== 'undefined') {
          toast.error('An unknown error occurred. Please try again later.');
        }
      }
      throw error;
    }
  };

  private handleError = (
    error: AxiosError<{ message: string }>,
    toastError: boolean = true
  ): void => {
    if (!error.response) {
      // Network error
      console.error('Network error:', error.message);
      if (typeof window !== 'undefined' && toastError) {
        toast.error('Network error. Please check your internet connection.');
      }
    } else if (error.response.data.message) {
      // Server error message
      console.error(error.response.data.message);
      if (typeof window !== 'undefined' && toastError) {
        if (error.status && error.status >= 400 && error.status < 500) {
          toast.warn(error.response.data.message);
        } else {
          toast.error(error.response.data.message);
        }
      }
    } else {
      // General error
      console.error('Error:', error.message || error);
      if (typeof window !== 'undefined' && toastError) {
        toast.error(`Error: ${error.message || error}`);
      }
    }
  };
}

export default Api;

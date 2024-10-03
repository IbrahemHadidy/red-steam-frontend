import Api from '@services/api';

// Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class UserPayment extends Api {
  constructor() {
    super('user/payment');
  }

  public createOrder = async (
    totalPrice: string,
    cartItems: number[]
  ): Promise<{ orderId: string }> => {
    const endpoint: string = `/order/create`;
    const data = { totalPrice, cartItems };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response.data;
  };

  public captureOrder = async (
    orderId: string,
    cartItems: number[]
  ): Promise<{ data: { orderId: string }; status: number }> => {
    const endpoint: string = `/order/capture`;
    const data = { orderId, cartItems };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response;
  };
}

export const { createOrder, captureOrder } = new UserPayment();

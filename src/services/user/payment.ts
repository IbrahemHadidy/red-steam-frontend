import Api from 'services/api';

// Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class UserPayment extends Api {
  constructor() {
    super('payment/order');
  }

  public createOrder = async (
    totalPrice: string,
    cartItems: number[]
  ): Promise<{ orderId: string }> => {
    const accessToken: string | null = this.getAccessToken();

    const endpoint: string = `/create`;
    const data = { totalPrice, cartItems };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response.data;
  };

  public captureOrder = async (
    orderId: string,
    cartItems: number[]
  ): Promise<{ data: { orderId: string }; status: number }> => {
    const accessToken: string | null = this.getAccessToken();

    const endpoint: string = `/capture`;
    const data = { orderId, cartItems };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response.data;
  };
}

export const { createOrder, captureOrder } = new UserPayment();

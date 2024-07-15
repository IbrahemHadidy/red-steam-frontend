import Api from 'services/api';

class Payment extends Api {
  constructor() {
    super('payment/order');
  }

  public createOrder = async (totalPrice: string, cartItems: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `create`;
    const data = { totalPrice, cartItems };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);

    return response.data;
  };

  public captureOrder = async (orderId: string, cartItems: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `capture`;
    const data = { orderId, cartItems };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);

    return response.data;
  };
}

export const { createOrder, captureOrder } = new Payment();
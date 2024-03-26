import axios from 'axios';
const env = import.meta.env;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

class Payment {
  async createOrder(userId: string, totalPrice: string, cartItems: string[]) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/payment/paypal/create-order`,
        {
          userId,
          totalPrice,
          cartItems,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  }

  async captureOrder(orderId: string, userId: string, cartItems: string[]) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/payment/paypal/capture-order`,
        { orderId, userId, cartItems },
      );
      return response;
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      throw error;
    }
  }
}

export const { createOrder, captureOrder } = new Payment();

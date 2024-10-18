// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// APIs
import userAuthApi from '@store/apis/user/auth';
import userPaymentApi from '@store/apis/user/payment';

// Types
import type { OnApproveData } from '@paypal/paypal-js';

export const createOrder = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'shop/checkout/createOrder',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const { userCart, totalPrice } = getState().cart;

    try {
      // Create order
      const result = await dispatch(
        userPaymentApi.endpoints.createOrder.initiate({
          totalPrice,
          cartItems: userCart.map((item) => item.id) ?? [],
        })
      ).unwrap();

      return fulfillWithValue(result.orderId);
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast.error('Failed to create PayPal order');
      return rejectWithValue('Failed to create PayPal order');
    }
  }
);

export const captureOrder = createAppAsyncThunk<string, OnApproveData, { rejectValue: string }>(
  'shop/checkout/captureOrder',
  async (data, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
    const { userCart } = getState().cart;

    try {
      // Capture order
      const response = await dispatch(
        userPaymentApi.endpoints.captureOrder.initiate({
          orderId: data.orderID,
          cartItems: userCart.map((item) => item.id) ?? [],
        })
      ).unwrap();

      await dispatch(userAuthApi.endpoints.updateUserData.initiate()).unwrap();

      return fulfillWithValue(response.orderId);
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      toast.error('Failed to capture PayPal order');
      return rejectWithValue('Failed to capture PayPal order');
    }
  }
);

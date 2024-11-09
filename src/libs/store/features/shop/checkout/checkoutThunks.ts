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
    const { userCart, totalPrice } = getState().shop.cart;

    // Create order
    const result = await toast
      .promise(
        dispatch(
          userPaymentApi.endpoints.createOrder.initiate({
            totalPrice,
            cartItems: userCart.map((item) => item.id) ?? [],
          })
        ).unwrap(),
        {
          pending: 'Creating PayPal order...',
          error: 'Failed to create PayPal order',
        }
      )
      .catch((error) => {
        console.error('Error creating PayPal order:', error);
        return rejectWithValue('Failed to create PayPal order');
      });

    if (!('orderId' in result)) return rejectWithValue('Failed to create PayPal order');
    return fulfillWithValue(result.orderId);
  }
);

export const captureOrder = createAppAsyncThunk<string, OnApproveData, { rejectValue: string }>(
  'shop/checkout/captureOrder',
  async (data, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
    const { userCart } = getState().shop.cart;

    // Capture order
    const response = await toast
      .promise(
        dispatch(
          userPaymentApi.endpoints.captureOrder.initiate({
            orderId: data.orderID,
            cartItems: userCart.map((item) => item.id) ?? [],
          })
        ).unwrap(),
        {
          pending: 'Capturing PayPal order...',
          error: 'Failed to capture PayPal order',
        }
      )
      .catch((error) => {
        console.error('Error capturing PayPal order:', error);
        return rejectWithValue('Failed to capture PayPal order');
      });

    if (!('orderId' in response)) return rejectWithValue('Failed to capture PayPal order');

    await dispatch(userAuthApi.endpoints.updateUserData.initiate()).unwrap();
    return fulfillWithValue(response.orderId);
  }
);

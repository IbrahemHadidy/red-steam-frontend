// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// APIs
import { captureOrderService, createOrderService } from '@store/apis/user/payment';

// Utils
import promiseToast from '@utils/promiseToast';

// Types
import type { OnApproveData } from '@paypal/paypal-js';

export const createOrder = createAppAsyncThunk<string>(
  'shop/checkout/createOrder',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const { userCart, totalPrice } = getState().shop.cart;

    // Create order
    const result = await promiseToast(
      dispatch(
        createOrderService.initiate({
          totalPrice,
          cartItems: userCart.map((item) => item.id) ?? [],
        })
      ).unwrap(),
      {
        pending: 'Creating PayPal order',
        fallbackError: 'Failed to create PayPal order',
      }
    );
    if (!result) return rejectWithValue('Failed to create PayPal order');

    return fulfillWithValue(result.orderId);
  }
);

export const captureOrder = createAppAsyncThunk<string, OnApproveData>(
  'shop/checkout/captureOrder',
  async (data, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
    const { userCart } = getState().shop.cart;

    // Capture order
    const response = await promiseToast(
      dispatch(
        captureOrderService.initiate({
          orderId: data.orderID,
          cartItems: userCart.map((item) => item.id) ?? [],
        })
      ).unwrap(),
      {
        pending: 'Capturing PayPal order',
        fallbackError: 'Failed to capture PayPal order',
      }
    );
    if (!response) return rejectWithValue('Failed to capture PayPal order');

    await dispatch(fetchUserData());
    return fulfillWithValue(response.orderId);
  }
);

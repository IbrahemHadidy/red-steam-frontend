// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

const userPaymentApi = createApi({
  reducerPath: 'api/user/payment',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/payment`,
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ orderId: string }, { totalPrice: string; cartItems: number[] }>(
      {
        query: ({ totalPrice, cartItems }) => ({
          url: '/order/create',
          method: ApiMethod.POST,
          body: { totalPrice, cartItems },
          credentials: 'include',
        }),
      }
    ),

    captureOrder: builder.mutation<
      { orderId: string; status: number },
      { orderId: string; cartItems: number[] }
    >({
      query: ({ orderId, cartItems }) => ({
        url: '/order/capture',
        method: ApiMethod.POST,
        body: { orderId, cartItems },
        credentials: 'include',
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCaptureOrderMutation } = userPaymentApi;

export const { createOrder: createOrderService, captureOrder: captureOrderService } =
  userPaymentApi.endpoints;

export default userPaymentApi;

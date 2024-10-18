// Redux
import { createSlice } from '@reduxjs/toolkit';

// Thunks
import { captureOrder } from './checkoutThunks';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  readonly isCartInitialized: boolean;
  readonly isPaymentConfirmed: boolean;
  readonly isReviewSelected: boolean;
  readonly isCheckboxChecked: boolean;
  readonly orderId: string;
}

// Initial state
const checkoutState: CheckoutState = {
  isCartInitialized: false,
  isPaymentConfirmed: false,
  isReviewSelected: false,
  isCheckboxChecked: false,
  orderId: '',
};

const checkoutSlice = createSlice({
  name: 'shop/checkout',
  initialState: checkoutState,

  reducers: {
    setCartInitialized: (state, action: PayloadAction<boolean>) => {
      state.isCartInitialized = action.payload;
    },
    setPaymentConfirmed: (state, action: PayloadAction<boolean>) => {
      state.isPaymentConfirmed = action.payload;
    },
    setReviewSelected: (state, action: PayloadAction<boolean>) => {
      state.isReviewSelected = action.payload;
    },
    toggleCheckboxChecked: (state) => {
      state.isCheckboxChecked = !state.isCheckboxChecked;
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(captureOrder.fulfilled, (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
      state.isPaymentConfirmed = true;
    });
  },
});

export const {
  setCartInitialized,
  setPaymentConfirmed,
  setReviewSelected,
  toggleCheckboxChecked,
  setOrderId,
} = checkoutSlice.actions;
export default checkoutSlice;

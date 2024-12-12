// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { clearCart, removeCartItem } from './cartThunks';

// Types
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  readonly isCartInitialized: boolean;
  readonly userCart: Game[];
  readonly removeBtnLoading: boolean;
  readonly removeAllBtnLoading: boolean;
  readonly totalPrice: string;
}

// Initial state
const cartState: CartState = {
  isCartInitialized: false,
  userCart: [],
  removeBtnLoading: false,
  removeAllBtnLoading: false,
  totalPrice: '0.00',
};

const cartSlice = createSlice({
  name: 'shop/cart',
  initialState: cartState,

  reducers: {
    setCartInitialized: (state, action: PayloadAction<boolean>) => {
      state.isCartInitialized = action.payload;
    },
    updateCart: (state, action: PayloadAction<Game[]>) => {
      state.userCart = action.payload;
    },
    setRemoveBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.removeBtnLoading = action.payload;
    },
    setRemoveAllBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.removeAllBtnLoading = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<string>) => {
      state.totalPrice = action.payload;
    },
    reset: () => cartState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.removeBtnLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.removeBtnLoading = false;
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.removeBtnLoading = false;
      })

      .addCase(clearCart.pending, (state) => {
        state.removeAllBtnLoading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.removeAllBtnLoading = false;
      })
      .addCase(clearCart.rejected, (state) => {
        state.removeAllBtnLoading = false;
      });
  },
});

// Listener actions
export const initializeCart = createAction<void>('shop/cart/initializeCart');

export const {
  setCartInitialized,
  updateCart,
  setRemoveBtnLoading,
  setRemoveAllBtnLoading,
  setTotalPrice,
  reset,
} = cartSlice.actions;
export default cartSlice;

// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { clearCart, removeCartItem } from './cartThunks';

// Types
import type { Game } from '@entities/game.entity';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  readonly userCart: Game[];
  readonly removeBtnLoading: boolean;
  readonly removeAllBtnLoading: boolean;
  readonly totalPrice: string;
}

// Initial state
const cartState: CartState = {
  userCart: [],
  removeBtnLoading: false,
  removeAllBtnLoading: false,
  totalPrice: '0.00',
};

const cartSlice = createSlice({
  name: 'shop/cart',
  initialState: cartState,

  reducers: {
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

// Listeners actions
export const initializeCart = createAction('shop/cart/initializeCart');

export const { updateCart, setRemoveBtnLoading, setRemoveAllBtnLoading, setTotalPrice } =
  cartSlice.actions;
export default cartSlice;

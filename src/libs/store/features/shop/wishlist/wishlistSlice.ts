// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { addToCart, addToLibrary, removeFromWishlist } from './wishlistThunks';

// Types
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  readonly isWishlistInitialized: boolean;
  readonly userWishlist: Game[];
  readonly isCartBtnLoading: boolean;
  readonly isRemoveBtnLoading: boolean;
}

// Initial state
const wishlistState: WishlistState = {
  isWishlistInitialized: false,
  userWishlist: [],
  isCartBtnLoading: false,
  isRemoveBtnLoading: false,
};

const wishlistSlice = createSlice({
  name: 'shop/wishlist',
  initialState: wishlistState,

  reducers: {
    setIsWishlistInitialized: (state, action: PayloadAction<boolean>) => {
      state.isWishlistInitialized = action.payload;
    },
    updateWishlist: (state, action: PayloadAction<Game[]>) => {
      state.userWishlist = action.payload;
    },
    setCartBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.isCartBtnLoading = action.payload;
    },
    setRemoveBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.isRemoveBtnLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isCartBtnLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isCartBtnLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isCartBtnLoading = false;
      })

      .addCase(addToLibrary.pending, (state) => {
        state.isCartBtnLoading = true;
      })
      .addCase(addToLibrary.fulfilled, (state) => {
        state.isCartBtnLoading = false;
      })
      .addCase(addToLibrary.rejected, (state) => {
        state.isCartBtnLoading = false;
      })

      .addCase(removeFromWishlist.pending, (state) => {
        state.isRemoveBtnLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state) => {
        state.isRemoveBtnLoading = false;
      })
      .addCase(removeFromWishlist.rejected, (state) => {
        state.isRemoveBtnLoading = false;
      });
  },
});

// Listener actions
export const initializeWishlist = createAction('shop/wishlist/initializeWislist');

export const { setIsWishlistInitialized, updateWishlist, setCartBtnLoading, setRemoveBtnLoading } =
  wishlistSlice.actions;
export default wishlistSlice;

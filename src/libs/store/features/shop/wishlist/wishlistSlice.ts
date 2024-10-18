// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { addToCart, addToLibrary, removeFromWishlist } from './wishlistThunks';

// Types
import type { Game } from '@entities/game.entity';
import type { PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  readonly hoveredItemIndex: number | null;
  readonly userWishlist: Game[];
  readonly isCartBtnLoading: boolean;
  readonly isRemoveBtnLoading: boolean;
}

// Initial state
const wishlistState: WishlistState = {
  hoveredItemIndex: null,
  userWishlist: [],
  isCartBtnLoading: false,
  isRemoveBtnLoading: false,
};

const wishlistSlice = createSlice({
  name: 'shop/wishlist',
  initialState: wishlistState,

  reducers: {
    setHoveredItemIndex: (state, action: PayloadAction<number | null>) => {
      state.hoveredItemIndex = action.payload;
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

// Listeners actions
export const initializeWishlist = createAction('shop/wishlist/initializeWislist');

export const { setHoveredItemIndex, updateWishlist, setCartBtnLoading, setRemoveBtnLoading } =
  wishlistSlice.actions;
export default wishlistSlice;

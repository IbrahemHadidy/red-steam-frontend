// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import {
  addToCart,
  addToLibrary,
  addToWishlist,
  getReviews,
  removeFromWishlist,
  submitReview,
} from './gameThunks';

// Types
import type { ReviewFilter, ReviewSort } from '@custom-types/reviews';
import type { Game, ImageEntry, VideoEntry } from '@interfaces/game';
import type { Review } from '@interfaces/review';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  // Base
  readonly isGameFetching: boolean;
  readonly currentGame: Game | null;
  readonly isGameInCart: boolean;
  readonly isGameInWishlist: boolean;
  readonly isGameInLibrary: boolean;

  //------------------ Media ------------------//
  readonly isRendered: boolean;
  readonly currentMediaLink: string | null;
  readonly isPageVisible: boolean;
  readonly tagsModalVisible: boolean;
  readonly orderedMediaEntries: (ImageEntry | VideoEntry)[];
  readonly currentMediaIndex: number;

  // Video player
  readonly autoPlayVideo: boolean;
  readonly overlayVisible: boolean;
  readonly videoVolume: number;
  readonly videoMuted: boolean;
  readonly wasPausedBeforeSwapping: boolean;

  // Screenshot viewer
  readonly isMouseOverScreenshot: boolean;
  readonly isScreenshotModalOpen: boolean;

  //---------------- Reviewing -----------------//
  readonly hasReviewed: boolean;
  readonly reviewId: number | null;
  readonly positive: boolean | null;
  readonly content: string;

  //--------------- All Reviews ----------------//
  readonly reviews: Review[];
  readonly filter: ReviewFilter;
  readonly sort: ReviewSort;
  readonly currentPage: number;
  readonly hasMore: boolean;

  //---------------- Pending UI ----------------//
  readonly isWishlistBtnLoading: boolean;
  readonly isCartBtnLoading: boolean;
  readonly isLibraryBtnLoading: boolean;
  readonly isReviewBtnDisabled: boolean;
}

// Initial state
const gameState: GameState = {
  isGameFetching: true,
  currentGame: null,
  isGameInCart: false,
  isGameInWishlist: false,
  isGameInLibrary: false,

  isRendered: false,
  currentMediaLink: null,
  isPageVisible: true,
  tagsModalVisible: false,
  orderedMediaEntries: [],
  currentMediaIndex: 0,

  autoPlayVideo: true,
  overlayVisible: false,
  videoVolume: 1,
  videoMuted: false,
  wasPausedBeforeSwapping: false,

  isMouseOverScreenshot: false,
  isScreenshotModalOpen: false,

  hasReviewed: false,
  reviewId: null,
  positive: null,
  content: '',

  reviews: [],
  filter: 'all',
  sort: 'newest',
  currentPage: 0,
  hasMore: true,

  isWishlistBtnLoading: false,
  isCartBtnLoading: false,
  isLibraryBtnLoading: false,
  isReviewBtnDisabled: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: gameState,

  reducers: {
    //------------------------------ Base ------------------------------//
    setIsGameFetching: (state, action: PayloadAction<boolean>) => {
      state.isGameFetching = action.payload;
    },
    setCurrentGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload;
    },
    setIsGameInCart: (state, action: PayloadAction<boolean>) => {
      state.isGameInCart = action.payload;
    },
    setIsGameInWishlist: (state, action: PayloadAction<boolean>) => {
      state.isGameInWishlist = action.payload;
    },
    setIsGameInLibrary: (state, action: PayloadAction<boolean>) => {
      state.isGameInLibrary = action.payload;
    },

    //------------------------------ Media -----------------------------//
    setIsRendered: (state, action: PayloadAction<boolean>) => {
      state.isRendered = action.payload;
    },
    updateCurrentMediaLink: (state, action: PayloadAction<string | null>) => {
      state.currentMediaLink = action.payload;
    },
    setIsPageVisible: (state, action: PayloadAction<boolean>) => {
      state.isPageVisible = action.payload;
    },
    toggleTagsModalVisible: (state) => {
      state.tagsModalVisible = !state.tagsModalVisible;
    },
    setOrderedMediaEntries: (state, action: PayloadAction<(ImageEntry | VideoEntry)[]>) => {
      state.orderedMediaEntries = action.payload;
    },
    setCurrentMediaIndex: (state, action: PayloadAction<number>) => {
      state.currentMediaIndex = action.payload;
    },

    // Video player
    setAutoPlayVideo: (state, action: PayloadAction<boolean>) => {
      state.autoPlayVideo = action.payload;
    },
    setOverlayVisible: (state, action: PayloadAction<boolean>) => {
      state.overlayVisible = action.payload;
    },
    setVideoVolume: (state, action: PayloadAction<number>) => {
      state.videoVolume = action.payload;
    },
    setVideoMuted: (state, action: PayloadAction<boolean>) => {
      state.videoMuted = action.payload;
    },
    setWasPausedBeforeSwapping: (state, action: PayloadAction<boolean>) => {
      state.wasPausedBeforeSwapping = action.payload;
    },

    // Screenshot viewer and modal
    setIsMouseOverScreenshot: (state, action: PayloadAction<boolean>) => {
      state.isMouseOverScreenshot = action.payload;
    },
    setIsScreenshotModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isScreenshotModalOpen = action.payload;
    },
    navigateImageEntry: (state, action: PayloadAction<'left' | 'right'>) => {
      const direction = action.payload;
      const game = state.currentGame;

      if (!game) return;

      const currentIndex = game.imageEntries.findIndex(
        (entry) => entry.link === state.currentMediaLink
      );

      let newIndex = currentIndex;
      do {
        newIndex =
          direction === 'left'
            ? (currentIndex - 1 + game.imageEntries.length) % game.imageEntries.length
            : (currentIndex + 1) % game.imageEntries.length;
      } while (!game.imageEntries[newIndex]);

      const newEntry = game.imageEntries[newIndex];

      state.currentMediaIndex = newIndex;
      state.currentMediaLink = newEntry.link;
    },

    //------------------------------ Review -----------------------------//
    setHasReviewed: (state, action: PayloadAction<boolean>) => {
      state.hasReviewed = action.payload;
    },
    setReviewId: (state, action: PayloadAction<number | null>) => {
      state.reviewId = action.payload;
    },
    setPositive: (state, action: PayloadAction<boolean | null>) => {
      state.positive = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },

    //-------------------------- All Reviews ----------------------------//
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setFilter: (state, action: PayloadAction<ReviewFilter>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<ReviewSort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetReviews: (state) => {
      state.reviews = [];
      state.currentPage = 0;
      state.hasMore = true;
    },

    disableButtons: (state) => {
      state.isCartBtnLoading = true;
      state.isWishlistBtnLoading = true;
      state.isLibraryBtnLoading = true;
      state.isReviewBtnDisabled = true;
    },

    reset: () => gameState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isWishlistBtnLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.isWishlistBtnLoading = false;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.isWishlistBtnLoading = false;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.isWishlistBtnLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state) => {
        state.isWishlistBtnLoading = false;
      })
      .addCase(removeFromWishlist.rejected, (state) => {
        state.isWishlistBtnLoading = false;
      })
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
        state.isLibraryBtnLoading = true;
      })
      .addCase(addToLibrary.fulfilled, (state) => {
        state.isLibraryBtnLoading = false;
      })
      .addCase(addToLibrary.rejected, (state) => {
        state.isLibraryBtnLoading = false;
      })
      .addCase(submitReview.pending, (state) => {
        state.isReviewBtnDisabled = true;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.isReviewBtnDisabled = false;
      })
      .addCase(submitReview.rejected, (state) => {
        state.isReviewBtnDisabled = false;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        const { reviews, hasMore } = action.payload;

        state.reviews = reviews;
        state.hasMore = hasMore;
      });
  },
});

// Listener actions
export const initializeGame = createAction<string>('game/initializeGame');
export const initializeGamePreview = createAction<Game>('game/initializeGamePreview');
export const initializeReviews = createAction<void>('game/initializeReviews');

export const {
  setIsGameFetching,
  setCurrentGame,
  setIsGameInCart,
  setIsGameInWishlist,
  setIsGameInLibrary,
  setIsRendered,
  updateCurrentMediaLink,
  setIsPageVisible,
  toggleTagsModalVisible,
  setOrderedMediaEntries,
  setCurrentMediaIndex,
  setAutoPlayVideo,
  setOverlayVisible,
  setVideoVolume,
  setVideoMuted,
  setWasPausedBeforeSwapping,
  setIsMouseOverScreenshot,
  setIsScreenshotModalOpen,
  navigateImageEntry,
  setHasReviewed,
  setReviewId,
  setPositive,
  setContent,
  setReviews,
  setFilter,
  setSort,
  setCurrentPage,
  setHasMore,
  resetReviews,
  disableButtons,
  reset,
} = gameSlice.actions;
export default gameSlice;

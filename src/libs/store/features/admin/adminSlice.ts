// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import {
  deleteItem,
  fetchPaginatedDevelopers,
  fetchPaginatedFeatures,
  fetchPaginatedLanguages,
  fetchPaginatedOffers,
  fetchPaginatedPublishers,
  fetchPaginatedReviews,
  fetchPaginatedTags,
  submitItem,
  updateItem,
} from './adminThunks';

// Utils
import get7DaysFromNow from '@utils/get7DaysFromNow';

// Enums
import { AdminType, Direction } from '@enums/admin';

// Types
import type { AdminListItem, ItemSortConfig, SearchQuery } from '@custom-types/admin';
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  readonly adminType: AdminType;

  //------------------ Offer Creation ------------------//
  readonly offerGame: Game | null;
  readonly discountPrice: string;
  readonly offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  readonly discountStartDate: string;
  readonly discountEndDate: string;

  //--------------------- Common -----------------------//
  readonly name: string;
  readonly website: string;
  readonly icon: string;

  //------------------- Items List ---------------------//
  readonly items: AdminListItem[];
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly totalPages: number;
  readonly sortConfig: ItemSortConfig;
  readonly searchQuery: SearchQuery;

  readonly isEditModalOpen: boolean;
  readonly isDeleteModalOpen: boolean;

  readonly currentEditItem: AdminListItem | null;
  readonly deleteItemId: number | null;

  readonly isInitialized: boolean;
  readonly isFetching: boolean;
  readonly isSubmitting: boolean;
}

// Initial state
const adminState: AdminState = {
  adminType: AdminType.Tag,

  offerGame: null,
  discountPrice: '0.00',
  offerType: 'SPECIAL PROMOTION',
  discountStartDate: new Date().toISOString().split('T')[0],
  discountEndDate: get7DaysFromNow().toISOString().split('T')[0],

  name: '',
  website: '',
  icon: '',

  items: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  sortConfig: { key: 'id', direction: Direction.ASC },
  searchQuery: {},

  isEditModalOpen: false,
  isDeleteModalOpen: false,

  currentEditItem: null,
  deleteItemId: null,

  isInitialized: false,
  isFetching: true,
  isSubmitting: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: adminState,

  reducers: {
    setAdminType: (state, action: PayloadAction<AdminType>) => {
      state.adminType = action.payload;
    },

    setOfferGame: (state, action: PayloadAction<Game | null>) => {
      state.offerGame = action.payload;
    },
    setDiscountPrice: (state, action: PayloadAction<string>) => {
      state.discountPrice = action.payload;
    },
    setOfferType: (state, action: PayloadAction<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>) => {
      state.offerType = action.payload;
    },
    setDiscountStartDate: (state, action: PayloadAction<string>) => {
      state.discountStartDate = action.payload;
    },
    setDiscountEndDate: (state, action: PayloadAction<string>) => {
      state.discountEndDate = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload;
    },
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },

    setItems: (state, action: PayloadAction<AdminListItem[]>) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<ItemSortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<SearchQuery>) => {
      state.searchQuery = action.payload;
    },

    setCurrentEditItem: (state, action: PayloadAction<AdminListItem | null>) => {
      state.currentEditItem = action.payload;
    },
    setDeleteItemId: (state, action: PayloadAction<number | null>) => {
      state.deleteItemId = action.payload;
    },

    setIsEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
    setIsDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },

    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },

    resetInputs: (state) => {
      state.discountPrice = adminState.discountPrice;
      state.offerType = adminState.offerType;
      state.discountStartDate = adminState.discountStartDate;
      state.discountEndDate = adminState.discountEndDate;

      state.name = '';
      state.website = '';
      state.icon = '';
    },
    reset: () => adminState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitItem.pending, (state) => {
        state.isFetching = true;
        state.isSubmitting = true;
      })
      .addCase(submitItem.fulfilled, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
      })
      .addCase(submitItem.rejected, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
      })

      .addCase(updateItem.pending, (state) => {
        state.isFetching = true;
        state.isSubmitting = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
        state.isEditModalOpen = false;
      })
      .addCase(updateItem.rejected, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
        state.isEditModalOpen = false;
      })

      .addCase(deleteItem.pending, (state) => {
        state.isFetching = true;
        state.isSubmitting = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
        state.isDeleteModalOpen = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        state.isFetching = false;
        state.isSubmitting = false;
        state.isDeleteModalOpen = false;
      })

      .addCase(fetchPaginatedFeatures.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedFeatures.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedFeatures.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedPublishers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedPublishers.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedPublishers.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedDevelopers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedDevelopers.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedDevelopers.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedLanguages.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedLanguages.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedLanguages.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedTags.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedTags.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedTags.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedReviews.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedReviews.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedReviews.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(fetchPaginatedOffers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedOffers.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedOffers.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

// Listener actions
export const initializeDevelopersAdmin = createAction<void>('admin/initializeDevelopersAdmin');
export const initializePublishersAdmin = createAction<void>('admin/initializePublishersAdmin');
export const initializeFeaturesAdmin = createAction<void>('admin/initializeFeaturesAdmin');
export const initializeTagsAdmin = createAction<void>('admin/initializeTagsAdmin');
export const initializeLanguagesAdmin = createAction<void>('admin/initializeLanguagesAdmin');
export const initializeReviewsAdmin = createAction<void>('admin/initializeReviewsAdmin');
export const initializeOffersAdmin = createAction<void>('admin/initializeOffersAdmin');
export const initializeCreateOfferAdmin = createAction<number>('admin/initializeCreateOfferAdmin');

export const {
  setAdminType,
  setOfferGame,
  setDiscountPrice,
  setOfferType,
  setDiscountStartDate,
  setDiscountEndDate,
  setName,
  setWebsite,
  setIcon,
  setItems,
  setCurrentPage,
  setItemsPerPage,
  setTotalPages,
  setSortConfig,
  setSearchQuery,
  setCurrentEditItem,
  setDeleteItemId,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  setIsInitialized,
  setIsFetching,
  resetInputs,
  reset,
} = adminSlice.actions;
export default adminSlice;

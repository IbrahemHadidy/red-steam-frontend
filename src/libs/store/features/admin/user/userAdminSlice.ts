// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { fetchPaginatedUsers, updateUser } from './userAdminThunks';

// Types
import type { SearchQuery, UserSortConfig } from '@custom-types/admin';
import type { User } from '@interfaces/user';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  readonly currentUsers: User[];
  readonly currentPage: number;
  readonly usersPerPage: number;
  readonly totalPages: number;
  readonly sortConfig: UserSortConfig;
  readonly searchQuery: SearchQuery;

  readonly currentEditUser: User | null;
  readonly deleteUserId: string | null;

  readonly isEditModalOpen: boolean;
  readonly isDeleteModalOpen: boolean;
  readonly isFetching: boolean;
}

// Initial state
const adminState: AdminState = {
  currentUsers: [],
  currentPage: 1,
  usersPerPage: 10,
  totalPages: 0,
  sortConfig: { key: 'username', direction: 'ASC' },
  searchQuery: {},

  currentEditUser: null,
  deleteUserId: null,

  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isFetching: false,
};

const userAdminSlice = createSlice({
  name: 'admin/user',
  initialState: adminState,

  reducers: {
    setCurrentUsers: (state, action: PayloadAction<User[]>) => {
      state.currentUsers = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setUsersPerPage: (state, action: PayloadAction<number>) => {
      state.usersPerPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<UserSortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<SearchQuery>) => {
      state.searchQuery = action.payload;
    },

    setCurrentEditUser: (state, action: PayloadAction<User | null>) => {
      state.currentEditUser = action.payload;
    },
    setDeleteUserId: (state, action: PayloadAction<string>) => {
      state.deleteUserId = action.payload;
    },

    setIsEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
    setIsDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },

    reset: () => adminState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedUsers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPaginatedUsers.fulfilled, (state, action) => {
        state.currentUsers = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.isFetching = false;
      })
      .addCase(fetchPaginatedUsers.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

// Listener actions
export const initializeUserAdmin = createAction<void>('admin/user/initializeUserAdmin');

export const {
  setCurrentUsers,
  setCurrentPage,
  setUsersPerPage,
  setTotalPages,
  setSortConfig,
  setSearchQuery,
  setCurrentEditUser,
  setDeleteUserId,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  setIsFetching,
  reset,
} = userAdminSlice.actions;
export default userAdminSlice;

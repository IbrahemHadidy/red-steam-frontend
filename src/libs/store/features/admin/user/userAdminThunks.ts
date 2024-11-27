// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { setIsFetching } from './userAdminSlice';

// Utils
import debounce from '@utils/debounce';
import promiseToast from '@utils/promiseToast';

// APIs
import userAdminApi from '@store/apis/user/admin';

// Types
import type { User } from '@interfaces/user';
import type { AppDispatch } from '@store/store';

interface FetchPaginatedUsersPayload {
  items: User[];
  total: number;
  totalPages: number;
}

export const fetchPaginatedUsers = createAppAsyncThunk<FetchPaginatedUsersPayload>(
  'admin/user/fetchPaginatedUsers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, usersPerPage, sortConfig, searchQuery } = getState().admin.user;

    const data = await promiseToast(
      dispatch(
        userAdminApi.endpoints.getUsersPaginated.initiate({
          page: currentPage,
          limit: usersPerPage,
          orderBy: sortConfig.key,
          order: sortConfig.direction,
          searchQuery,
        })
      ).unwrap(),
      {
        pending: 'Fetching users...',
        fallbackError: 'Error fetching users',
      }
    );
    if (!data) return rejectWithValue('Error fetching users');

    return fulfillWithValue(data);
  }
);

export const debouncedFetchPaginatedUsers = (() => {
  const debounced = debounce((dispatch: AppDispatch) => {
    dispatch(fetchPaginatedUsers());
  }, 500);

  return (dispatch: AppDispatch) => {
    dispatch(setIsFetching(true));
    debounced(dispatch);
  };
})();

export const updateUser = createAppAsyncThunk(
  'admin/user/updateUser',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { currentEditUser } = getState().admin.user;

    const result = await promiseToast(
      dispatch(
        userAdminApi.endpoints.updateUser.initiate({
          id: currentEditUser?.id ?? '',
          isAdmin: currentEditUser?.isAdmin ?? false,
          isVerified: currentEditUser?.isVerified ?? false,
        })
      ).unwrap(),
      {
        pending: 'Editing user',
        fallbackError: 'Error editing user',
      }
    );
    if (!result) return rejectWithValue('Error editing user');

    debouncedFetchPaginatedUsers(dispatch);
  }
);

export const deleteUser = createAppAsyncThunk(
  'admin/user/deleteUser',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { deleteUserId } = getState().admin.user;

    const result = await promiseToast(
      dispatch(userAdminApi.endpoints.deleteUser.initiate(deleteUserId ?? '')).unwrap(),
      {
        pending: 'Deleting user',
        fallbackError: 'Error deleting user',
      }
    );
    if (!result) return rejectWithValue('Error deleting user');

    debouncedFetchPaginatedUsers(dispatch);
  }
);

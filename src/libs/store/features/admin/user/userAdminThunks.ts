// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { setIsFetching } from './userAdminSlice';

// Utils
import debounce from '@utils/debounce';

// APIs
import userAdminApi from '@store/apis/user/admin';

// Types
import type { User } from '@interfaces/user';
import type { AppDispatch } from '@store/store';

export interface FetchPaginatedUsersPayload {
  items: User[];
  total: number;
  totalPages: number;
}

export const fetchPaginatedUsers = createAppAsyncThunk<
  FetchPaginatedUsersPayload,
  void,
  { rejectValue: string }
>(
  'admin/user/fetchPaginatedUsers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, usersPerPage, sortConfig, searchQuery } = getState().admin.user;

    const data = await toast
      .promise<FetchPaginatedUsersPayload>(
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
          error: 'Error fetching users',
        }
      )
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching users');
    }
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

export const updateUser = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'admin/user/updateUser',
  async (_, { dispatch, getState }) => {
    const { currentEditUser } = getState().admin.user;

    await toast
      .promise(
        dispatch(
          userAdminApi.endpoints.updateUser.initiate({
            id: currentEditUser?.id ?? '',
            isAdmin: currentEditUser?.isAdmin ?? false,
            isVerified: currentEditUser?.isVerified ?? false,
          })
        ).unwrap(),
        {
          pending: 'Editing user...',
          error: 'Error editing user',
        }
      )
      .catch((error) => {
        console.error('Error editing user:', error);
      });

    debouncedFetchPaginatedUsers(dispatch);
  }
);

export const deleteUser = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'admin/user/deleteUser',
  async (_, { dispatch, getState }) => {
    const { deleteUserId } = getState().admin.user;

    await toast
      .promise(dispatch(userAdminApi.endpoints.deleteUser.initiate(deleteUserId ?? '')).unwrap(), {
        pending: 'Deleting user...',
        error: 'Error deleting user',
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });

    debouncedFetchPaginatedUsers(dispatch);
  }
);

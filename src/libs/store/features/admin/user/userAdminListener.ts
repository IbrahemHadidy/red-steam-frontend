// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Thunks
import { debouncedFetchPaginatedUsers } from './userAdminThunks';

// Handlers
import { initializeUserAdmin, reset } from './userAdminSlice';

// Types
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const userAdminListener = createListenerMiddleware();
const listen = userAdminListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for user admin initialization and fetch users
listen({
  actionCreator: initializeUserAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    debouncedFetchPaginatedUsers(dispatch);
  },
});

// Listen for search or pagination changes and fetch new results
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.admin.user.currentPage !== previousState.admin.user.currentPage ||
    currentState.admin.user.usersPerPage !== previousState.admin.user.usersPerPage ||
    currentState.admin.user.sortConfig !== previousState.admin.user.sortConfig ||
    currentState.admin.user.searchQuery !== previousState.admin.user.searchQuery ||
    (!currentState.admin.user.isEditModalOpen && previousState.admin.user.isEditModalOpen) ||
    (!currentState.admin.user.isDeleteModalOpen && previousState.admin.user.isDeleteModalOpen),

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    debouncedFetchPaginatedUsers(dispatch);
  },
});

// Export the listener
export default userAdminListener;

// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { setInitialTags, updateInitialTags, updateSelectedTags } from './userTagsSlice';

// APIs
import tagsApi from '@store/apis/common/tags';

// Utils
import promiseToast from '@utils/promiseToast';

// Types
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const userTagsListener = createListenerMiddleware();
const listen = userTagsListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for country initialization
listen({
  actionCreator: setInitialTags,
  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const userTags = getState().auth.currentUserData?.tags;

    // Get initial tags
    const initialTags = await promiseToast(
      dispatch(tagsApi.endpoints.getAllTags.initiate()).unwrap(),
      {
        pending: 'Fetching tags',
        fallbackError: 'Error fetching tags',
      }
    );

    // Update state
    dispatch(updateInitialTags(initialTags ?? []));
    dispatch(updateSelectedTags(userTags ?? []));
  },
});

// Export the listener
export default userTagsListener;

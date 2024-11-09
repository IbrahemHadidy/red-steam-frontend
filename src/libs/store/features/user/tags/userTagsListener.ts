// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { setInitialTags, updateInitialTags, updateSelectedTags } from './userTagsSlice';

// APIs
import tagsApi from '@store/apis/common/tags';

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

    try {
      // Get initial tags
      const initialTags = await dispatch(tagsApi.endpoints.getAllTags.initiate()).unwrap();

      // Update state
      dispatch(updateInitialTags(initialTags));
      dispatch(updateSelectedTags(userTags ?? []));
    } catch (error) {
      console.error(error);
    }
  },
});

// Export the listener
export default userTagsListener;

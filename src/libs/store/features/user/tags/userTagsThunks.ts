// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Apis
import { changeTagsService } from '@store/apis/user/interaction';

// Types
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const submitTags = createAppAsyncThunk<string, AppRouterInstance>(
  'user/tags/submitTags',
  async (router, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { selectedTags } = getState().user.tags;

    if (selectedTags.length >= 3) {
      const selectedTagIds: number[] = selectedTags
        .filter((tag) => tag !== undefined && tag !== null && tag.id)
        .map((tag) => tag.id);

      await toast.promise(dispatch(changeTagsService.initiate(selectedTagIds)), {
        pending: 'Changing tags...',
        success: 'Tags changed successfully',
        error: 'An error occurred. Please try again later.',
      });

      // Update user data
      await dispatch(fetchUserData());

      // Redirect to home
      router.push('/');

      // Resolve with success message
      return fulfillWithValue('Tags changed successfully');
    } else {
      toast.warn('Please add at least 3 tags to continue.');
      return rejectWithValue('Please add at least 3 tags to continue.');
    }
  }
);

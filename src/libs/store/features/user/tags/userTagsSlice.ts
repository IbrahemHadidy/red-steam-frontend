// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { submitTags } from './userTagsThunks';

// Types
import type { Tag } from '@interfaces/tag';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ChangeModalType = 'email' | 'password' | 'phone';

interface userTagsState {
  readonly searchQuery: string;

  readonly initialTags: Tag[];
  readonly selectedTags: Tag[];

  readonly isSubmitDisabled: boolean;
}

// Initial state
const userTagsState: userTagsState = {
  searchQuery: '',

  initialTags: [],
  selectedTags: [],

  isSubmitDisabled: false,
};

const userTagsSlice = createSlice({
  name: 'user/tags',
  initialState: userTagsState,

  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    updateInitialTags: (state, action: PayloadAction<Tag[]>) => {
      state.initialTags = action.payload;
    },

    updateSelectedTags: (state, action: PayloadAction<Tag[]>) => {
      state.selectedTags = action.payload;
    },
    toggleTagSelection: (state, action: PayloadAction<Tag>) => {
      const { selectedTags } = state;
      const tag = action.payload;

      const isTagSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id);

      if (!isTagSelected) {
        state.selectedTags = [...selectedTags, tag];
      } else {
        state.selectedTags = selectedTags.filter((selectedTag) => selectedTag.id !== tag.id);
      }
    },

    setSubmitDisabled: (state, action: PayloadAction<boolean>) => {
      state.isSubmitDisabled = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitTags.pending, (state) => {
        state.isSubmitDisabled = true;
      })
      .addCase(submitTags.fulfilled, (state) => {
        state.isSubmitDisabled = false;
      })
      .addCase(submitTags.rejected, (state) => {
        state.isSubmitDisabled = false;
      });
  },
});

// Listener actions
export const setInitialTags = createAction('user/tags/setInitialTags');

export const {
  updateSearchQuery,
  updateInitialTags,
  updateSelectedTags,
  toggleTagSelection,
  setSubmitDisabled,
} = userTagsSlice.actions;
export default userTagsSlice;

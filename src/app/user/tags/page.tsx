'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setInitialTags,
  toggleTagSelection,
  updateSearchQuery,
} from '@store/features/user/tags/userTagsSlice';

// Redux Thunks
import { submitTags } from '@store/features/user/tags/userTagsThunks';

// Constants
import { ACCOUNT_CREATION_BG } from '@config/constants/backgrounds';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import getFilteredSortedTags from './utils/getFilteredSortedTags';
import isTagSelected from './utils/isTagSelected';

// Types
import type { Tag } from '@interfaces/tag';
import type { ChangeEvent } from 'react';

export default function TagsPage() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();
  useDynamicBackground(ACCOUNT_CREATION_BG);

  //------------------------------- States --------------------------------//
  const { initialTags, selectedTags, searchQuery, isSubmitDisabled } = useAppSelector(
    (state) => state.user.tags
  );

  //------------------------------ On Mount -------------------------------//
  useEffect(() => {
    dispatch(setInitialTags());
  }, [dispatch]);

  //----------------------------- Event Handlers --------------------------//
  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateSearchQuery(value));
  };

  const handleTagSelect = (tag: Tag): void => {
    dispatch(toggleTagSelection(tag));
  };

  const handleSubmit = async (): Promise<void> => {
    await dispatch(submitTags(router));
  };

  //---------------------------- Render UI Section ------------------------//
  const sortedTags = getFilteredSortedTags(searchQuery, initialTags, selectedTags);

  return (
    <>
      <div className="tag-select-container">
        <div className="user-tags-warning">
          <h2>Please select at least 3 tags to proceed.</h2>
        </div>

        <div className="tags-search-container">
          <input
            type="text"
            className="tags-search-input"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <div className="tag-options">
          {sortedTags.map((tag) => (
            <div
              key={tag.id}
              className={`tag-option ${isTagSelected(selectedTags, tag) ? 'selected' : ''}`}
              onClick={() => handleTagSelect(tag)}
            >
              {tag.name}
            </div>
          ))}
        </div>

        <button className="tags-submit" onClick={handleSubmit} disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </>
  );
}

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchQuery } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function SearchByContent() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.admin.common);

  const handleSearchQueryContentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery({ ...searchQuery, content: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="searchWebsite">Search by Content: </label>
      <input
        type="text"
        id="searchContent"
        value={searchQuery.content ?? ''}
        onChange={handleSearchQueryContentChange}
        placeholder="Search by Content"
      />
    </div>
  );
}

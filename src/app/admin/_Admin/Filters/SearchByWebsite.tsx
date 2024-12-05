// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchQuery } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function SearchByWebsite() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.admin.common);

  const handleSearchQueryWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery({ ...searchQuery, website: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="searchWebsite">Search by Website: </label>
      <input
        type="text"
        id="searchWebsite"
        value={searchQuery.website ?? ''}
        onChange={handleSearchQueryWebsiteChange}
        placeholder="Search by Website"
      />
    </div>
  );
}

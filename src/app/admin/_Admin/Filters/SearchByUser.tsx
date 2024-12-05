// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchQuery } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function SearchByUser() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.admin.common);

  const handleSearchQueryUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery({ ...searchQuery, username: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="searchUsername">Search by User: </label>
      <input
        type="text"
        id="searchUsername"
        value={searchQuery.username ?? ''}
        onChange={handleSearchQueryUserNameChange}
        placeholder="Search by User"
      />
    </div>
  );
}

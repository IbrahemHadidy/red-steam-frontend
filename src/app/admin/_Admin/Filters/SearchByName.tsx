// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchQuery } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function SearchByName() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.admin.common);

  const handleSearchQueryNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery({ ...searchQuery, name: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="searchName">Search by Name: </label>
      <input
        type="text"
        id="searchName"
        value={searchQuery.name ?? ''}
        onChange={handleSearchQueryNameChange}
        placeholder="Search by Name"
      />
    </div>
  );
}

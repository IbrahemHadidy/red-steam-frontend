// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchQuery } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function SearchByGame() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.admin.common);

  const handleSearchQueryGameNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery({ ...searchQuery, gameName: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="searchGameName">Search by Game: </label>
      <input
        type="text"
        id="searchGameName"
        value={searchQuery.gameName}
        onChange={handleSearchQueryGameNameChange}
        placeholder="Search by Game"
      />
    </div>
  );
}

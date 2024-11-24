// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setCurrentPage,
  setSearchQuery,
  setUsersPerPage,
} from '@store/features/admin/user/userAdminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function Filters() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { usersPerPage, searchQuery } = useAppSelector((state) => state.admin.user);

  //--------------------------- Event Handlers ----------------------------//
  const handleSearchQueryChange = (field: string, value: string): void => {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        [field]: value,
      })
    );
    dispatch(setCurrentPage(1));
  };

  const handleUsersPerPageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setUsersPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="filters">
      <div className="search-box">
        <div>
          <label htmlFor="searchUsername">Search by Username:</label>
          <input
            type="text"
            id="searchUsername"
            value={searchQuery.name}
            onChange={(e) => handleSearchQueryChange('username', e.target.value)}
            placeholder="Search by Username"
          />
        </div>

        <div>
          <label htmlFor="searchEmail">Search by Email:</label>
          <input
            type="text"
            id="searchEmail"
            value={searchQuery.name}
            onChange={(e) => handleSearchQueryChange('email', e.target.value)}
            placeholder="Search by Email"
          />
        </div>
      </div>

      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" value={usersPerPage} onChange={handleUsersPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

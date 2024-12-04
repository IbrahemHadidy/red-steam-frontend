// React
import { useRef, useState } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setSearchInputValue,
  setSearchQuery,
  setSortOption,
} from '@store/features/search/searchSlice';

// Constants
import { SORT_OPTIONS } from '@constants/search';

// Types
import type { SortOption } from '@custom-types/search';
import type { ChangeEvent, MouseEvent } from 'react';

export default function SearchBar() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { sortOption, searchInputValue } = useAppSelector((state) => state.search);

  const [isSortOptionsOpen, setIsSortOptionsOpen] = useState<boolean>(false);

  //--------------------------------- Refs --------------------------------//
  const inputRef = useRef<HTMLInputElement>(null);

  //---------------------------- Event Handlers ---------------------------//
  const toggleDropdown = (): void => {
    setIsSortOptionsOpen((prev) => !prev);
  };

  const selectOption = (option: SortOption): void => {
    dispatch(setSortOption(option));
    setIsSortOptionsOpen(false);
  };

  const handleSearchFocus = (): void => {
    if (searchInputValue === '') dispatch(setSearchQuery(''));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchInputValue(e.target.value));
  };

  const handleSearchButton = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (searchInputValue === '' || searchInputValue.trim() === '') {
      dispatch(setSearchQuery(''));
    } else {
      dispatch(setSearchQuery(searchInputValue));
    }
  };

  //-------------------------------- Render -------------------------------//

  return (
    <div className="search-bar">
      <div className="sort-box">
        <div className="label">Sort by</div>
        <div className="select-container">
          <div className={`trigger ${isSortOptionsOpen ? 'open' : ''}`} onClick={toggleDropdown}>
            {sortOption}
          </div>

          {isSortOptionsOpen && (
            <div className="select-dropdown">
              <ul className="custom-dropdown">
                {SORT_OPTIONS.map((option) => (
                  <li
                    key={option}
                    className={`${option === sortOption ? 'active' : ''}`}
                    onClick={() => selectOption(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="searchbar-left">
        <input
          ref={inputRef}
          type="text"
          value={searchInputValue}
          placeholder="Enter game name"
          onFocus={handleSearchFocus}
          onChange={handleInputChange}
        />
        <button className="search-btn" type="submit" onClick={handleSearchButton}>
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

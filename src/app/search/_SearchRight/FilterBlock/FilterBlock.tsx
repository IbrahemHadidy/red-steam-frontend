// React
import { useEffect, useRef, useState } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { checkFilter, uncheckFilter } from '@store/features/search/searchSlice';

// Utils
import getFilterTypeFromTitle from '@app/search/_utils/getFilterTypeFromTitle';

// Constants
import {
  DEFAULT_OPEN_DROPDOWNS,
  DROPDOWN_HEIGHTS_BY_CHILD_COUNT,
  EXCLUDABLE_FILTER_TITLES,
} from '@config/constants/search';

// Components
import BlockHeader from './BlockHeader';
import ExcludedRow from './ExcludedRow';
import IncludedRow from './IncludedRow';
import UncheckedRow from './UncheckedRow';

// Types
import type { Filter, FilterTitle } from '@custom-types/search';
import type { ChangeEvent, MouseEvent } from 'react';

interface FilterBlockProps {
  title: FilterTitle;
  filters: Filter[];
}

export default function FilterBlock({ title, filters }: FilterBlockProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');

  //-------------------------------- Refs ---------------------------------//
  const filterRef = useRef<HTMLDivElement>(null);

  //------------------------------- Effects -------------------------------//
  useEffect(() => {
    if (DEFAULT_OPEN_DROPDOWNS.includes(title) && filters.length !== 0) setIsOpen(true);
  }, [filters.length, title]);

  useEffect(() => {
    setDropdownHeight(filterRef.current?.scrollHeight ?? 0);
  }, [isOpen]);

  //---------------------------- Event Handlers ---------------------------//
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value.toLowerCase());
    setTimeout(() => {
      if (filterRef.current) {
        const childNodesLength = filterRef.current.childNodes.length;
        const height = DROPDOWN_HEIGHTS_BY_CHILD_COUNT[childNodesLength] ?? 340;
        setDropdownHeight(height);
      }
    });
  };

  const handleIncludeClick = (row: Filter): void => {
    if (row.check === 'included') {
      dispatch(uncheckFilter({ filterType: getFilterTypeFromTitle(title), id: row.id }));
    } else {
      dispatch(
        checkFilter({ filterType: getFilterTypeFromTitle(title), check: 'included', id: row.id })
      );
    }
  };

  const handleExcludeClick = (e: MouseEvent<HTMLImageElement>, row: Filter): void => {
    e.stopPropagation();
    if (row.check === 'excluded') {
      dispatch(uncheckFilter({ filterType: getFilterTypeFromTitle(title), id: row.id }));
    } else {
      dispatch(
        checkFilter({ filterType: getFilterTypeFromTitle(title), check: 'excluded', id: row.id })
      );
    }
  };

  //--------------------------- Render UI Section -------------------------//
  const includedRows = filters.filter((row) => row.check === 'included');
  const excludedRows = filters.filter((row) => row.check === 'excluded');
  const uncheckedRows = filters.filter((row) => row.check === 'unchecked');

  return (
    <div className="filter-block">
      <BlockHeader title={title} isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`filter-content ${!isOpen ? 'closed' : ''}`}
        style={{ height: isOpen ? `${dropdownHeight}px` : '0px', maxHeight: '340px' }}
      >
        <div style={{ maxHeight: '300px', overflow: 'hidden' }} ref={filterRef}>
          {includedRows.map((row) => (
            <IncludedRow
              key={`checked-${title}-${row.id}`}
              row={row}
              handleIncludeClick={handleIncludeClick}
              handleExcludeClick={
                EXCLUDABLE_FILTER_TITLES.includes(title) ? handleExcludeClick : undefined
              }
            />
          ))}

          {excludedRows.map((row) => (
            <ExcludedRow
              key={`excluded-${title}-${row.id}`}
              row={row}
              handleIncludeClick={handleIncludeClick}
              handleExcludeClick={handleExcludeClick}
            />
          ))}

          {uncheckedRows.map((row) => (
            <UncheckedRow
              key={`unchecked-${title}-${row.id}`}
              row={row}
              handleIncludeClick={handleIncludeClick}
              handleExcludeClick={
                EXCLUDABLE_FILTER_TITLES.includes(title) ? handleExcludeClick : undefined
              }
            />
          ))}
        </div>

        {filters.length > 10 && (
          <input
            className="search-filter"
            type="text"
            placeholder={`search for more ${title.toLowerCase()}s`}
            value={searchValue}
            onChange={handleSearch}
          />
        )}
      </div>
    </div>
  );
}

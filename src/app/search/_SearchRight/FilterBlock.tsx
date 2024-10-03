// React
import { useEffect, useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';

// Images
import dropdown from '@images/dropdown.png';
import excludedSearch from '@images/search_checkbox_not.svg';

// Types
import type { ChangeEvent, JSX } from 'react';
import type { FilterBlockProps } from '../Search.types';

export default function FilterBlock({
  title,
  filters,
  handleIncludeClick,
  handleExcludeClick,
  hasSearch,
}: FilterBlockProps): JSX.Element {
  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');

  // Refs
  const filterRef = useRef<HTMLDivElement>(null);

  // Add the dropdowns you want to be openend as default here
  const defaultOpenDropdowns = useMemo((): string[] => ['Feature', 'Tag'], []);
  useEffect(() => {
    if (defaultOpenDropdowns.includes(title) && filters.length !== 0) {
      setIsOpen(true);
    }
  }, [defaultOpenDropdowns, filters.length, title]);

  useEffect(() => {
    setDropdownHeight(filterRef.current?.scrollHeight ?? 0);
  }, [isOpen]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value.toLowerCase());
    setTimeout(() => {
      if (filterRef.current) {
        const heights: { [key: number]: number } = {
          0: 40,
          1: 70,
          2: 100,
          3: 130,
          4: 160,
          5: 190,
          6: 220,
          7: 250,
          8: 280,
          9: 310,
        };
        const childNodesLength: number = filterRef.current.childNodes.length;
        const height: number = heights[childNodesLength] || 340;
        setDropdownHeight(height);
      }
    });
  };

  return (
    <div className="filter-block">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <div>Narrow by {title}</div>
        <div className={`filter-header-arrow`}>
          <Image
            className={isOpen ? 'open' : ''}
            src={dropdown}
            height={6}
            width={10}
            alt="arrow"
          />
        </div>
      </div>
      <div
        className={`filter-content ${!isOpen ? 'closed' : ''}`}
        style={{ height: isOpen ? `${dropdownHeight}px` : '0px', maxHeight: '340px' }}
      >
        <div style={{ maxHeight: '300px', overflow: 'hidden' }} ref={filterRef}>
          {filters
            .filter(
              (row) => row.check === 'included' && row.name.toLowerCase().includes(searchValue)
            )
            .map((row) => (
              <div
                key={`checked-${title}-${row.id}`}
                className={`filter-control-row ${row.check === 'included' ? 'checked' : ''}`}
                onClick={() => handleIncludeClick(row)}
              >
                <span className="filter-tab">
                  <span>
                    <span className="tab-checkbox" />
                    <span className="tab-label">{row.name}</span>
                  </span>
                </span>
                {handleExcludeClick && (
                  <span className="tab-exclude">
                    <Image
                      src={excludedSearch}
                      alt="exclude"
                      onClick={(e) => handleExcludeClick(e, row)}
                    />
                  </span>
                )}
              </div>
            ))}
          {handleExcludeClick && (
            <>
              {filters
                .filter(
                  (row) => row.check === 'excluded' && row.name.toLowerCase().includes(searchValue)
                )
                .map((row) => (
                  <div
                    key={`excluded-${title}-${row.id}`}
                    className="filter-control-row excluded"
                    onClick={() => handleIncludeClick(row)}
                  >
                    <span className="filter-tab">
                      <span>
                        <span className="tab-checkbox" />
                        <span className="tab-label">{row.name}</span>
                        <span className="tab-count" style={{ display: 'none' }}>
                          {/* TODO: results count here */}
                        </span>
                      </span>
                    </span>
                    <span className="tab-exclude">
                      <Image
                        src={excludedSearch}
                        alt="exclude"
                        onClick={(e) => handleExcludeClick && handleExcludeClick(e, row)}
                      />
                    </span>
                  </div>
                ))}
            </>
          )}
          {filters
            .filter(
              (row) => row.check === 'unchecked' && row.name.toLowerCase().includes(searchValue)
            )
            .map((row) => (
              <div
                key={`unchecked-${title}-${row.id}`}
                className="filter-control-row"
                onClick={() => handleIncludeClick(row)}
              >
                <span className="filter-tab">
                  <span>
                    <span className="tab-checkbox" />
                    <span className="tab-label">{row.name}</span>
                    <span className="tab-count" style={{ display: 'none' }}>
                      {/* TODO: results count here */}
                    </span>
                  </span>
                </span>
                {handleExcludeClick && (
                  <span className="tab-exclude">
                    <Image
                      src={excludedSearch}
                      alt="exclude"
                      onClick={(e) => handleExcludeClick(e, row)}
                    />
                  </span>
                )}
              </div>
            ))}
        </div>
        {hasSearch && (
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

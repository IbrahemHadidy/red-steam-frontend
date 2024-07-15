'use client';

// React
import { useEffect, useRef, useState } from 'react';

// Next.js
import Image from 'next/image';

// Images
import excludedSearch from 'images/search_checkbox_not.svg';

// Types
import type { ChangeEvent, FC, MouseEvent as ReactMouseEvent } from 'react';
import { RowProps } from 'react-bootstrap';
import type { SearchRightProps } from './Search.types';

export const SearchRight: FC<SearchRightProps> = ({
  rangeValue,
  setRangeValue,
  handlePriceChange,
  handlePriceRowClick,
  handleTagRowClick,
  handleTagRowExcludeClick,
  handleOSRowClick,
  getPriceRangeLabel,
  filters,
  isViewport960,
}) => {
  // States
  const [isShown, setIsShown] = useState(false);
  const [isPriceDropdownOpened, setIsPriceDropdownOpened] = useState(false);
  const [isTagDropdownOpened, setIsTagDropdownOpened] = useState(false);
  const [isOSDropdownOpened, setIsOSDropdownOpened] = useState(false);
  const [priceDropdownHeight, setPriceDropdownHeight] = useState(0);
  const [tagDropdownHeight, setTagDropdownHeight] = useState(0);
  const [OSDropdownHeight, setOSDropdownHeight] = useState(0);
  const [tagSearchValue, setTagSearchValue] = useState('');
  const [isTagFocused, setIsTagFocused] = useState(false);

  // Refs
  const priceDropdown = useRef<HTMLDivElement | null>(null);
  const tagDropdown = useRef<HTMLDivElement | null>(null);
  const OSDropdown = useRef<HTMLDivElement | null>(null);
  const filteredTags = useRef<HTMLDivElement | null>(null);

  // Add the dropdowns you want to be openend as default here
  useEffect(() => {
    setIsPriceDropdownOpened(true);
    setIsTagDropdownOpened(true);
  }, []);

  // Handle the expanding of the price dropdown
  useEffect(() => {
    setPriceDropdownHeight(priceDropdown.current?.scrollHeight ?? 0);
  }, [isPriceDropdownOpened]);

  // Handle the expanding of the tag dropdown
  useEffect(() => {
    setTagDropdownHeight(tagDropdown.current?.scrollHeight ?? 0);
  }, [isTagDropdownOpened]);

  // Handle the expanding of the OS dropdown
  useEffect(() => {
    setOSDropdownHeight(OSDropdown.current?.scrollHeight ?? 0);
  }, [isOSDropdownOpened]);

  const handleTagSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTagSearchValue(e.target.value.toLowerCase());
    setTimeout(() => {
      // Set the height depending on how many children inside
      setTimeout(() => {
        if (filteredTags.current) {
          const heights: { [key: number]: number } = { 0: 40, 1: 70, 2: 100, 3: 130, 4: 160 };
          const childNodesLength = filteredTags.current.childNodes.length;
          const height = heights[childNodesLength] || 200;
          setTagDropdownHeight(height);
        }
      });
    });
  };
  const handleTagFocus = () => {
    setIsTagFocused(true);
  };

  const handleTagBlur = () => {
    setIsTagFocused(false);
  };

  const handlePriceHeaderClick = () => {
    setIsPriceDropdownOpened(!isPriceDropdownOpened);
  };

  const handleTagHeaderClick = () => {
    setIsTagDropdownOpened(!isTagDropdownOpened);
  };

  const handleOSHeaderClick = () => {
    setIsOSDropdownOpened(!isOSDropdownOpened);
  };

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };

  const handlePriceRangeMouseUp = (e: ReactMouseEvent<HTMLInputElement>) => {
    handlePriceChange(Number((e.target as HTMLInputElement).value));
  };

  const handlePriceIncludeClick = (row: RowProps) => {
    handlePriceRowClick({
      name: row.name,
      check: row.check,
    });
  };

  const handleTagIncludeClick = (row: RowProps) => {
    handleTagRowClick({
      name: row.name,
      check: row.check,
    });
  };

  const handleTagExcludeClick = (e: ReactMouseEvent<HTMLImageElement>, row: RowProps) => {
    e.stopPropagation();
    handleTagRowExcludeClick({
      name: row.name,
      check: row.check,
    });
  };

  const handleOSIncludeClick = (row: RowProps) => {
    handleOSRowClick({
      name: row.name,
      check: row.check,
    });
  };

  const handleShowClick = () => {
    setIsShown(true);
  };

  const handleOverlayClick = () => {
    setIsShown(false);
  };

  const rightCol = (
    <div className="search-rightcol">
      <div className="filter-block">
        <div className="filter-header" onClick={handlePriceHeaderClick}>
          <div>Narrow by Price</div>
        </div>
        <div
          className={`filter-content ${!isPriceDropdownOpened ? 'closed' : ''}`}
          style={{
            height: isPriceDropdownOpened ? `${priceDropdownHeight}px` : '0px',
          }}
          ref={priceDropdown}
        >
          <div className="range-container">
            <div className="range-inner">
              <input
                className="range-input"
                type="range"
                step={1}
                min={0}
                max={13}
                defaultValue={rangeValue}
                onChange={handlePriceRangeChange}
                onMouseUp={handlePriceRangeMouseUp}
              />
            </div>
            <div className="range-display">{getPriceRangeLabel(rangeValue)}</div>
          </div>
          <div className="block-rule" />
          {filters.price.map((row) => (
            <div
              key={row.name}
              className={`filter-control-row ${row.check === 'included' ? 'checked' : ''}`}
              onClick={() => handlePriceIncludeClick(row)}
            >
              <span className="filter-tab">
                <span>
                  <span className="tab-checkbox" />
                  <span className="tab-label">{row.name}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-block">
        <div className="filter-header" onClick={handleTagHeaderClick}>
          <div>Narrow by tag</div>
        </div>
        <div
          className={`filter-content ${!isTagDropdownOpened ? 'closed' : ''}`}
          style={{
            height: isTagDropdownOpened ? `${tagDropdownHeight}px` : '0px',
            maxHeight: '190px',
          }}
          ref={tagDropdown}
        >
          <div style={{ maxHeight: '150px', overflow: 'hidden' }} ref={filteredTags}>
            {filters.tag
              .filter(
                (row) => row.check === 'included' && row.name.toLowerCase().includes(tagSearchValue)
              )
              .map((row) => (
                <div
                  key={`checkedTag-${row.name}`}
                  className="filter-control-row checked"
                  onClick={() => handleTagIncludeClick(row)}
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
                      onClick={(e) => handleTagExcludeClick(e, row)}
                    />
                  </span>
                </div>
              ))}
            {filters.tag
              .filter(
                (row) => row.check === 'excluded' && row.name.toLowerCase().includes(tagSearchValue)
              )
              .map((row) => (
                <div
                  key={`exludedTag-${row.name}`}
                  className="filter-control-row excluded"
                  onClick={() =>
                    handleTagRowClick({
                      name: row.name,
                      check: row.check,
                    })
                  }
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
                      onClick={(e) => handleTagExcludeClick(e, row)}
                    />
                  </span>
                </div>
              ))}
            {filters.tag
              .filter(
                (row) =>
                  row.check !== 'excluded' &&
                  row.check !== 'included' &&
                  row.name.toLowerCase().includes(tagSearchValue)
              )
              .map((row) => (
                <div
                  key={`tag${row.name}`}
                  className="filter-control-row"
                  onClick={() => handleTagRowClick(row)}
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
                      onClick={(e) => handleTagExcludeClick(e, row)}
                    />
                  </span>
                </div>
              ))}
          </div>
          <input
            className="search-filter"
            type="text"
            onFocus={handleTagFocus}
            onBlur={handleTagBlur}
            placeholder={isTagFocused ? '' : 'search for more tags'}
            value={tagSearchValue}
            onChange={handleTagSearch}
          />
        </div>
      </div>
      <div className="filter-block">
        <div className="filter-header" onClick={handleOSHeaderClick}>
          <div>Narrow by OS</div>
        </div>
        <div
          className={`filter-content ${!isOSDropdownOpened ? 'closed' : ''}`}
          style={{
            height: isOSDropdownOpened ? `${OSDropdownHeight}px` : '0px',
          }}
          ref={OSDropdown}
        >
          {filters.os.map((row) => (
            <div
              key={`os-${row.name}`}
              className={`filter-control-row ${row.check === 'included' ? 'checked' : ''}`}
              onClick={() => handleOSIncludeClick(row)}
            >
              <span className="filter-tab">
                <span>
                  <span className="tab-checkbox" />
                  <span className="tab-label">{row.name}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return !isViewport960 ? (
    rightCol
  ) : (
    <>
      <div className="open-filters" onClick={handleShowClick} />
      {isShown && <div className="overlay show" onClick={handleOverlayClick} />}
      <div className={`s-slide-menu ${isShown ? 'shown' : ''}`}>
        <div className="right-col-wrapper">{rightCol}</div>
      </div>
    </>
  );
};

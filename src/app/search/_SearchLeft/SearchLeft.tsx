'use client';

// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import HoverSummary from '@components/HoverSummary/HoverSummary';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';
import { getHoverInfo, getRatingClass } from '@utils/ratingUtils';

// Types
import type { FC, JSX } from 'react';
import type { SearchLeftProps } from '../Search.types';

export const SearchLeft: FC<SearchLeftProps> = ({
  toggleDropdown,
  sortOption,
  hasMore,
  setRequestParameters,
  fetchGamesData,
  isOpen,
  selectOptions,
  selectOption,
  inputRef,
  searchValue,
  handleSearch,
  handleInputChange,
  handleSearchButton,
  fetchedGames,
  disabled,
  isViewport960,
}): JSX.Element => {
  // Init
  const isViewport430 = useResponsiveViewport(430);
  const isViewport1070 = useResponsiveViewport(1070);

  // States
  const [summaryHoverStates, setSummaryHoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

  // Event handlers
  const handleNextItems = (): void => {
    if (!disabled) {
      fetchGamesData(true);
      setRequestParameters((prevState) => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          offset: prevState.pagination.offset + 1,
        },
      }));
    }
  };

  const handleResultPointerMove = (id: number): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleResultPointerLeave = (id: number): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleSummaryPointerMove = (id: number): void => {
    setHoverStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleSummaryPointerLeave = (id: number): void => {
    setHoverStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  return (
    <div className="search-leftcol">
      <div className="search-bar">
        <div className="sort-box">
          <div className="label">Sort by</div>
          <div className="select-container">
            <div className={`trigger ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
              {sortOption}
            </div>
            {isOpen && (
              <div className="select-dropdown">
                <ul className="custom-dropdown">
                  {selectOptions.map((option) => (
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
            value={searchValue}
            onFocus={handleSearch}
            onChange={handleInputChange}
          />
          <button className="search-btn" type="submit" onClick={handleSearchButton}>
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className={`search-results ${disabled ? 'disabled' : ''}`}>
        <InfiniteScroll
          dataLength={fetchedGames.length}
          next={handleNextItems}
          hasMore={hasMore}
          loader={<div>Loading...</div>}
        >
          {fetchedGames.map((result) => (
            <div key={result.id} className="search-result-container">
              <Link
                className="search-result"
                href={`/game/${result.id}`}
                onMouseEnter={() => handleResultPointerMove(result.id)}
                onMouseLeave={() => handleResultPointerLeave(result.id)}
              >
                {!isViewport430 && (
                  <img
                    className="s-col result-image"
                    src={result.thumbnailEntries.searchImage}
                    alt={result.name}
                  />
                )}
                <div className="reuslt-info">
                  {isViewport430 && (
                    <img
                      className="s-col result-image"
                      src={result.thumbnailEntries.searchImage}
                      alt={result.name}
                    />
                  )}
                  <div className="s-col result-name">
                    <span className="result-title">{result.name}</span>
                    <div>
                      {result.platformEntries.win && <span className="platform-img win" />}
                      {result.platformEntries.mac && <span className="platform-img mac" />}
                    </div>
                  </div>
                  <div className="s-col result-date">{formatDate(result.releaseDate)}</div>
                  <div className="s-col result-rating">
                    <span
                      className={`search-review-summary ${getRatingClass(result.averageRating)}`}
                      onMouseEnter={() => handleSummaryPointerMove(result.id)}
                      onMouseLeave={() => handleSummaryPointerLeave(result.id)}
                    >
                      {result.reviewsCount === 0 && 'N/A'}
                    </span>
                    {!isViewport960 && (
                      <span
                        className="review-tooltip"
                        style={{
                          opacity: hoverStates[result.id] && result.id === result.id ? '1' : '0',
                        }}
                      >
                        {getHoverInfo(result.averageRating, result.reviewsCount)}
                      </span>
                    )}
                  </div>
                  <div className="s-col result-price">
                    {!result.pricing?.discount ? (
                      <div className="s-discount-block">
                        <div className="discount-prices">
                          <div className={`discount-final-price s-${result.pricing?.discount}`}>
                            {result.pricing?.free ? 'Free' : `$${result.pricing?.basePrice}`}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="s-discount-block">
                        <div className="discount-percentage">
                          -{result.pricing.discountPercentage}%
                        </div>
                        <div className="discount-prices">
                          <div className="discount-original-price">${result.pricing.basePrice}</div>
                          <div className="discount-final-price">
                            ${result.pricing.discountPrice}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              {!isViewport1070 && summaryHoverStates[result.id] && (
                <div>
                  <HoverSummary
                    title={result.name}
                    date={formatDate(result.releaseDate)}
                    screenshots={result.imageEntries
                      .filter((img) => img.featured)
                      .map((img) => img.link)}
                    description={result.description}
                    positivePercentage={result.averageRating}
                    totalReviews={result.reviewsCount}
                    tags={result.tags?.map((tag) => tag.name) || []}
                    leftArrow={true}
                  />
                </div>
              )}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

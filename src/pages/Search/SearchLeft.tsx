'use client';

// React
import { useState } from 'react';

// Next.js
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import gameData from 'services/gameData/gameData';

// Types
import type { FC } from 'react';
import { getRatingClass } from 'utils/ratingUtils';
import type { SearchLeftProps } from './Search.types';

export const SearchLeft: FC<SearchLeftProps> = ({
  toggleDropdown,
  selectedOption,
  isOpen,
  selectOptions,
  selectOption,
  inputRef,
  searchValue,
  handleSearch,
  handleInputChange,
  handleSearchButton,
  isViewport960,
}) => {
  // Initializations
  const isViewport430 = useResponsiveViewport(430);
  const isViewport1070 = useResponsiveViewport(1070);

  // States
  const [summaryHoverStates, setSummaryHoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

  const handleResultPointerMove = (id: number) => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleResultPointerLeave = (id: number) => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleSummaryPointerMove = (id: number) => {
    setHoverStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleSummaryPointerLeave = (id: number) => {
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
              {selectedOption}
            </div>
            {isOpen && (
              <div className="select-dropdown">
                <ul className="custom-dropdown">
                  {selectOptions.map((option) => (
                    <li
                      key={option}
                      className={`${option === selectedOption ? 'active' : ''}`}
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
      <div className="search-results">
        {gameData.map((result) => {
          const positiveCount = result.reviews.filter(
            (review) => review.type === 'positive'
          ).length;
          const totalReviews = result.reviews.length;
          const positivePercentage = (positiveCount / totalReviews) * 100;
          const ratingClass = getRatingClass(positivePercentage);
          const summary =
            totalReviews === 0
              ? 'No reviews yet.'
              : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;

          return (
            <div key={result.id} className="search-result-container">
              <Link
                className="search-result"
                href={`/game/${result.id}`}
                onPointerMove={() => handleResultPointerMove(result.id)}
                onPointerLeave={() => handleResultPointerLeave(result.id)}
              >
                {!isViewport430 && (
                  <img className="s-col result-image" src={result.searchImage} alt={result.name} />
                )}
                <div className="reuslt-info">
                  {isViewport430 && (
                    <img
                      className="s-col result-image"
                      src={result.searchImage}
                      alt={result.name}
                    />
                  )}
                  <div className="s-col result-name">
                    <span className="result-title">{result.name}</span>
                    <div>
                      <span className="platform-img win" />
                      {result.mac && <span className="platform-img mac" />}
                    </div>
                  </div>
                  <div className="s-col result-date">{result.releaseDate}</div>
                  <div className="s-col result-rating">
                    <span
                      className={`search-review-summary ${ratingClass}`}
                      onPointerMove={() => handleSummaryPointerMove(result.id)}
                      onPointerLeave={() => handleSummaryPointerLeave(result.id)}
                    >
                      {result.reviews.length === 0 && 'N/A'}
                    </span>
                    {!isViewport960 && (
                      <span
                        className="review-tooltip"
                        style={{
                          opacity: hoverStates[result.id] && result.id === result.id ? '1' : '0',
                        }}
                      >
                        {summary}
                      </span>
                    )}
                  </div>
                  <div className="s-col result-price">
                    {!result.discount ? (
                      <div className="s-discount-block">
                        <div className="discount-prices">
                          <div className={`discount-final-price s-${result.discount}`}>
                            {result.free ? 'Free' : `$${result.price}`}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="s-discount-block">
                        <div className="discount-percentage">-{result.discountPercentage}%</div>
                        <div className="discount-prices">
                          <div className="discount-original-price">${result.price}</div>
                          <div className="discount-final-price">${result.discountPrice}</div>
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
                    date={result.releaseDate}
                    screenshots={result.moviesAndImages
                      .filter((item) => item.type === 'image' && item.featured)
                      .map((item) => item.link)}
                    description={result.description}
                    positivePercentage={positivePercentage}
                    totalReviews={totalReviews}
                    tags={result.tags}
                    leftArrow={true}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

'use client';

// React
import { useContext, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Utils
import formatDate from 'utils/formatDate';
import { getRatingClass } from 'utils/ratingUtils';

// Services
import gameData from 'services/gameData/gameData';

// Types
import type { FC, JSX } from 'react';
import type { Game } from 'types/game.types';
import type { SearchLeftProps } from '../Search.types';

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
  hideLibrary,
  hideWishlist,
  hideCart,
  isViewport960,
}): JSX.Element => {
  // Init
  const isViewport430 = useResponsiveViewport(430);
  const isViewport1070 = useResponsiveViewport(1070);

  // Contexts
  const { userData } = useContext(AuthContext);

  // States
  const [summaryHoverStates, setSummaryHoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

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

  const filterGames = (): Game[] => {
    return gameData.filter((game) => {
      if (hideLibrary && userData?.library?.some((item) => item.id === game.id)) {
        return false;
      }
      if (hideWishlist && userData?.wishlist?.some((item) => item.id === game.id)) {
        return false;
      }
      if (hideCart && userData?.cart?.some((item) => item.id === game.id)) {
        return false;
      }
      return true;
    });
  };

  const filteredGames: Game[] = filterGames();

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
        {filteredGames.map((result) => {
          const positiveCount = result.reviews.filter((review) => review.positive).length;
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
                      <span className="platform-img win" />
                      {result.platformEntries.mac && <span className="platform-img mac" />}
                    </div>
                  </div>
                  <div className="s-col result-date">{formatDate(result.releaseDate)}</div>
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
                    {!result.pricing.discount ? (
                      <div className="s-discount-block">
                        <div className="discount-prices">
                          <div className={`discount-final-price s-${result.pricing.discount}`}>
                            {result.pricing.free ? 'Free' : `$${result.pricing.basePrice}`}
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
                    screenshots={result.imageEntries.map((item) => item.link)}
                    description={result.description}
                    positivePercentage={positivePercentage}
                    totalReviews={totalReviews}
                    tags={result.tags.map((tag) => tag.name)}
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

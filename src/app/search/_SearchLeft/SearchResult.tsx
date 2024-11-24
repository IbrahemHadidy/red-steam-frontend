// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';
import { getHoverInfo, getRatingClass } from '@utils/ratingUtils';

// Components
import HoverSummary from '@components/HoverSummary/HoverSummary';

// Types
import type { Game } from '@interfaces/game';

interface SearchResult {
  result: Game;
}

export default function SearchResult({ result }: SearchResult) {
  //--------------------------- Initializations ---------------------------//
  const isViewport430OrLess = useResponsiveViewport(430);
  const isViewport960OrLess = useResponsiveViewport(960);
  const isViewport1070OrLess = useResponsiveViewport(1070);

  //------------------------------- States --------------------------------//
  const [isSummaryHovered, setIsSummaryHovered] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  //---------------------------- Event handlers ---------------------------//
  const handleResultPointerMove = (): void => {
    setIsSummaryHovered(true);
  };

  const handleResultPointerLeave = (): void => {
    setIsSummaryHovered(false);
  };

  const handleSummaryPointerMove = (): void => {
    setIsHovered(true);
  };

  const handleSummaryPointerLeave = (): void => {
    setIsHovered(false);
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="search-result-container">
      <Link
        className="search-result"
        href={`/game/${result.id}`}
        onMouseEnter={handleResultPointerMove}
        onMouseLeave={handleResultPointerLeave}
      >
        {!isViewport430OrLess && (
          <img
            className="s-col result-image"
            src={result.thumbnailEntries.searchImage}
            alt={result.name}
          />
        )}

        <div className="reuslt-info">
          {isViewport430OrLess && (
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
              onMouseEnter={handleSummaryPointerMove}
              onMouseLeave={handleSummaryPointerLeave}
            >
              {result.reviewsCount === 0 && 'N/A'}
            </span>

            {!isViewport960OrLess && (
              <span
                className="review-tooltip"
                style={{
                  opacity: isHovered && result.id === result.id ? '1' : '0',
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
                <div className="discount-percentage">-{result.pricing.discountPercentage}%</div>
                <div className="discount-prices">
                  <div className="discount-original-price">${result.pricing.basePrice}</div>
                  <div className="discount-final-price">${result.pricing.discountPrice}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      {!isViewport1070OrLess && (
        <HoverSummary
          title={result.name}
          date={formatDate(result.releaseDate)}
          screenshots={result.imageEntries.filter((img) => img.featured).map((img) => img.link)}
          description={result.description}
          positivePercentage={result.averageRating}
          totalReviews={result.reviewsCount}
          tags={result.tags?.map((tag) => tag.name) ?? []}
          rightArrow={true}
          isVisible={isSummaryHovered}
        />
      )}
    </div>
  );
}

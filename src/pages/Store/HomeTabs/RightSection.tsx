'use client';

// Next.js
import Link from 'next/link';

// Services
import {
  newAndTrending,
  popularUpcoming,
  specials,
  topSellers,
} from 'services/gameData/homeTabsItems';

// Utils
import { getHoverInfo, getRatingClass, getRatingText } from 'utils/ratingUtils';

// Types
import type { FC } from 'react';
import type { gamesData } from 'services/gameData/gameData';
import type { RightSectionProps } from '../Store.types';

const getGameDetails = (hoveredTabIndex: number, data: gamesData[]) => {
  const game = data[hoveredTabIndex];
  return {
    gameName: game.name,
    reviews: game.reviews,
    tags: game.tags,
    screenshots: game.moviesAndImages
      .filter((item) => item.type === 'image' && item.featured)
      .map((item) => item.link),
  };
};

const RightSection: FC<RightSectionProps> = ({ openedTab, hoveredTabIndex }) => {
  const tabsData: { [key: string]: gamesData[] } = {
    'New & Trending': newAndTrending,
    'Top Sellers': topSellers,
    'Popular Upcoming': popularUpcoming,
    Specials: specials,
  };

  const data = tabsData[openedTab];

  const { gameName, reviews, tags, screenshots } =
    hoveredTabIndex !== null
      ? getGameDetails(hoveredTabIndex, data)
      : { gameName: '', reviews: [], tags: [], screenshots: [] };

  const positiveReviews = reviews.filter(
    (review: { type: string }) => review.type === 'positive'
  ).length;
  const negativeReviews = reviews.filter(
    (review: { type: string }) => review.type === 'negative'
  ).length;

  const positivePercentage = (positiveReviews / (positiveReviews + negativeReviews)) * 100;
  const reviewSummary = getRatingText(positivePercentage);
  const ratingClass = getRatingClass(positivePercentage);
  const hoverInfo = getHoverInfo(positiveReviews, negativeReviews);

  return (
    <div className="tab-right">
      <div className="tab-right-content">
        {hoveredTabIndex !== null && (
          <div className="tab-preview">
            <h2>{gameName}</h2>
            <div className="tab-review-summary">
              <div className="review-title">Overall user reviews:</div>
              <span className={`game-review-summary ${ratingClass}`}>{reviewSummary || 'N/A'}</span>
              <span>&nbsp;({(positiveReviews + negativeReviews).toLocaleString()})</span>
              <span className="review-tooltip">{hoverInfo}</span>
            </div>
            <div className="tab-tags">
              {tags.map((tag, index) => (
                <Link className="tab-tag" key={index} href={`/search?tags=${tag}`}>
                  {tag}
                </Link>
              ))}
            </div>
            <div className="tabs-screenshots">
              {screenshots.map((screenshot, index) => (
                <div
                  className="tabs-screenshot"
                  style={{ backgroundImage: `url(${screenshot})` }}
                  key={index}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;

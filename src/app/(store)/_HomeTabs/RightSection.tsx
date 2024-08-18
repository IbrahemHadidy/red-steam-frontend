'use client';

// NextJS
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
import type { FC, JSX } from 'react';
import type { Game } from 'types/game.types';
import type { RightSectionProps } from '../Store.types';
import type { GetGameDetails } from './HomeTabs.types';

const getGameDetails = (hoveredTabIndex: number, data: Game[]): GetGameDetails => {
  const game: Game = data[hoveredTabIndex];
  return {
    gameName: game.name,
    reviews: game.reviews,
    tags: game.tags.map((tag: { name: string }) => tag.name),
    screenshots: game.imageEntries
      .filter((image) => image.featured)
      .map((image: { link: string }) => image.link),
  };
};

const RightSection: FC<RightSectionProps> = ({ openedTab, hoveredTabIndex }): JSX.Element => {
  const tabsData: { [key: string]: Game[] } = {
    'New & Trending': newAndTrending,
    'Top Sellers': topSellers,
    'Popular Upcoming': popularUpcoming,
    Specials: specials,
  };

  const data: Game[] = tabsData[openedTab];

  const { gameName, reviews, tags, screenshots } =
    hoveredTabIndex !== null
      ? getGameDetails(hoveredTabIndex, data)
      : { gameName: '', reviews: [], tags: [], screenshots: [] };

  const positiveReviews = reviews.filter((review: { positive: boolean }) => review.positive).length;
  const negativeReviews = reviews.filter(
    (review: { positive: boolean }) => !review.positive
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
              {tags.map((tag, idx) => (
                <Link className="tab-tag" key={idx} href={`/search?tags=${tag}`}>
                  {tag}
                </Link>
              ))}
            </div>
            <div className="tabs-screenshots">
              {screenshots.map((screenshot, idx) => (
                <div
                  className="tabs-screenshot"
                  style={{ backgroundImage: `url(${screenshot})` }}
                  key={idx}
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

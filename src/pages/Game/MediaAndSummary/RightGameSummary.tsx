'use client';

// React
import { useState } from 'react';

// Next.js
import Link from 'next/link';

// Components
import TagsModal from './TagsModal';

// Utils
import getHoverInfo from 'utils/getHoverInfo';
import { getRatingClass, getRatingText } from 'utils/ratingUtils';

// Types
import type { FC } from 'react';
import type { ReviewEntry } from 'services/gameData/gameData';
import type { RightGameSummaryProps } from './MediaAndSummary.types';

export const RightGameSummary: FC<RightGameSummaryProps> = ({
  game,
  isViewport630,
  isViewport960,
}) => {
  // States
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const totalReviews = game.reviews.length;
  const positiveReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'positive'
  ).length;
  const negativeReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'negative'
  ).length;

  const positivePercentage = (positiveReviews / totalReviews) * 100;
  const hoverInfo = getHoverInfo(positiveReviews, negativeReviews);
  const summary = getRatingText(positivePercentage);
  const ratingClass = getRatingClass(positivePercentage);

  return (
    <div className="right-game-summary">
      <div className="game-image">
        <img className="image-full" src={game.horizontalHeaderImage} alt="game-header" />
      </div>
      {isViewport630 && <div className="game-name-mobile">{game.name}</div>}
      <div className="game-discription">{game.description}</div>
      <div className="game-glance-first">
        <div className="user-reviews">
          <div className="user-reviews-summary">
            <div className="summary-subtitle">All Reviews:</div>
            <div className="summary-column">
              <span className={`game-review-summary ${ratingClass}`}>{summary || 'N/A'}</span>
              <span className="game-review-count">
                {' '}
                ({(positiveReviews + negativeReviews).toLocaleString()})
              </span>
              <span className="review-tooltip">{hoverInfo}</span>
            </div>
          </div>
        </div>
        <div className="release-date">
          <div className="summary-subtitle">Release Date:</div>
          <div className="date">{game.releaseDate}</div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Developer:</div>
          <div className="summary-column">
            <a href={game.developer.link}>{game.developer.name}</a>
          </div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Publisher:</div>
          <div className="summary-column">
            <a href={game.publisher.link}>{game.publisher.name}</a>
          </div>
        </div>
      </div>
      <div className="user-defined-tags">
        <div className="glance-tags-label">Popular user-defined tags for this product:</div>
        {!isViewport960 ? (
          <div className="glance-tags">
            {!showModal &&
              game.tags.slice(0, 4).map((tag, index) => (
                <Link key={index} className="game-tag" href={`/search?tags=${tag}`}>
                  {tag}
                </Link>
              ))}
            {!showModal && game.tags.length > 3 && (
              <a className="game-tag" onClick={toggleModal}>
                +
              </a>
            )}
            {showModal && <TagsModal onClose={toggleModal} tags={game.tags} />}
          </div>
        ) : (
          game.tags.map((tag, index) => (
            <Link key={index} className="game-tag" href={`/search?tags=${tag}`}>
              {tag}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

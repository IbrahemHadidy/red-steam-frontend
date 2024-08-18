'use client';

// React
import { Fragment, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import TagsModal from './TagsModal';

// Utils
import formatDate from 'utils/formatDate';
import getHoverInfo from 'utils/getHoverInfo';
import { getRatingClass, getRatingText } from 'utils/ratingUtils';

// Types
import type { FC, JSX } from 'react';
import type { Review } from 'types/review.types';
import type { RightGameSummaryProps } from '../MediaAndSummary.types';

export const RightGameSummary: FC<RightGameSummaryProps> = ({
  game,
  isViewport630,
  isViewport960,
}): JSX.Element => {
  // States
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const totalReviews = game.reviews.length;
  const positiveReviews = game.reviews.filter((review: Review) => review.positive).length;
  const negativeReviews = game.reviews.filter((review: Review) => !review.positive).length;

  const positivePercentage = (positiveReviews / totalReviews) * 100;
  const hoverInfo = getHoverInfo(positiveReviews, negativeReviews);
  const summary = getRatingText(positivePercentage);
  const ratingClass = getRatingClass(positivePercentage);

  return (
    <div className="right-game-summary">
      <div className="game-image">
        <img
          className="image-full"
          src={game.thumbnailEntries.horizontalHeaderImage}
          alt="game-header"
        />
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
          <div className="date">{formatDate(game.releaseDate)}</div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Developer:</div>
          <div className="summary-column">
            {game.developers.map((developer, idx) => (
              <Fragment key={developer.id}>
                <a href={developer.website}>{developer.name}</a>
                {idx !== game.developers.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Publisher:</div>
          <div className="summary-column">
            {game.publishers.map((publisher, idx) => (
              <Fragment key={publisher.id}>
                <a href={publisher.website}>{publisher.name}</a>
                {idx !== game.publishers.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="user-defined-tags">
        <div className="glance-tags-label">Popular user-defined tags for this product:</div>
        {!isViewport960 ? (
          <div className="glance-tags">
            {!showModal &&
              game.tags.slice(0, 4).map((tag) => (
                <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
                  {tag.name}
                </Link>
              ))}
            {!showModal && game.tags.length > 3 && (
              <a className="game-tag" onClick={toggleModal}>
                +
              </a>
            )}
            {showModal && (
              <TagsModal onClose={toggleModal} tags={game.tags.map((tag) => tag.name)} />
            )}
          </div>
        ) : (
          game.tags.map((tag) => (
            <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
              {tag.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

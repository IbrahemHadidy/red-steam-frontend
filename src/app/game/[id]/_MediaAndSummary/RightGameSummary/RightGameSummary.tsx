'use client';

// React
import { Fragment, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import TagsModal from './TagsModal';

// Utils
import formatDate from '@utils/formatDate';
import { getHoverInfo, getRatingClass, getRatingText } from '@utils/ratingUtils';

// Types
import type { JSX } from 'react';
import type { RightGameSummaryProps } from '../MediaAndSummary.types';

export default function RightGameSummary({
  game,
  isViewport630,
  isViewport960,
}: RightGameSummaryProps): JSX.Element {
  // States
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

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
      <div className="game-description">{game.description}</div>
      <div className="game-glance-first">
        <div className="user-reviews">
          <div className="user-reviews-summary">
            <div className="summary-subtitle">All Reviews:</div>
            <div className="summary-column">
              <span className={`game-review-summary ${getRatingClass(game.averageRating)}`}>
                {getRatingText(game.averageRating, game.reviewsCount)}
              </span>
              <span className="game-review-count"> ({game.reviewsCount.toString()})</span>
              <span className="review-tooltip">
                {getHoverInfo(game.averageRating, game.reviewsCount)}
              </span>
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
            {game.developers?.map((developer, idx) => (
              <Fragment key={developer.id}>
                <a href={developer.website}>{developer.name}</a>
                {game.developers && idx !== game.developers?.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Publisher:</div>
          <div className="summary-column">
            {game.publishers?.map((publisher, idx) => (
              <Fragment key={publisher.id}>
                <a href={publisher.website}>{publisher.name}</a>
                {game.publishers && idx !== game.publishers.length - 1 && ', '}
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
              game.tags?.slice(0, 4).map((tag) => (
                <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
                  {tag.name}
                </Link>
              ))}
            {!showModal && game.tags && game.tags?.length > 3 && (
              <a className="game-tag" onClick={toggleModal}>
                +
              </a>
            )}
            {showModal && (
              <TagsModal onClose={toggleModal} tags={game.tags?.map((tag) => tag.name) || []} />
            )}
          </div>
        ) : (
          game.tags?.map((tag) => (
            <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
              {tag.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

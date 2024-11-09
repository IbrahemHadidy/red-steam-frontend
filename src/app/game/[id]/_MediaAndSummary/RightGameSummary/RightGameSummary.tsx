'use client';

// React
import { Fragment } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { toggleTagsModalVisible } from '@store/features/game/gameSlice';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';
import { getHoverInfo, getRatingClass, getRatingText } from '@utils/ratingUtils';

// Components
import TagsModal from './TagsModal';

export default function RightGameSummary() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  //--------------------------- State Selectors ---------------------------//
  const { currentGame, tagsModalVisible } = useAppSelector((state) => state.game);

  //--------------------------- Event Handlers ---------------------------//
  const toggleModal = (): void => {
    dispatch(toggleTagsModalVisible());
  };

  //-------------------------- Render UI Section -------------------------//
  return (
    <div className="right-game-summary">
      <div className="game-image">
        <img
          className="image-full"
          src={currentGame?.thumbnailEntries.horizontalHeaderImage}
          alt="game-header"
        />
      </div>

      {isViewport630 && <div className="game-name-mobile">{currentGame?.name}</div>}

      <div className="game-description">{currentGame?.description}</div>

      <div className="game-glance-first">
        <div className="user-reviews">
          <div className="user-reviews-summary">
            <div className="summary-subtitle">All Reviews:</div>

            <div className="summary-column">
              <span className={`game-review-summary ${getRatingClass(currentGame?.averageRating)}`}>
                {getRatingText(currentGame?.averageRating, currentGame?.reviewsCount)}
              </span>

              <span className="game-review-count"> ({currentGame?.reviewsCount.toString()})</span>

              <span className="review-tooltip">
                {getHoverInfo(currentGame?.averageRating, currentGame?.reviewsCount)}
              </span>
            </div>
          </div>
        </div>

        <div className="release-date">
          <div className="summary-subtitle">Release Date:</div>

          <div className="date">{formatDate(currentGame?.releaseDate)}</div>
        </div>

        <div className="dev-publish">
          <div className="summary-subtitle">Developer:</div>

          <div className="summary-column">
            {currentGame?.developers?.map((developer, idx) => (
              <Fragment key={developer.id}>
                <a href={developer.website}>{developer.name}</a>
                {currentGame?.developers && idx !== currentGame?.developers?.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="dev-publish">
          <div className="summary-subtitle">Publisher:</div>

          <div className="summary-column">
            {currentGame?.publishers?.map((publisher, idx) => (
              <Fragment key={publisher.id}>
                <a href={publisher.website}>{publisher.name}</a>
                {currentGame?.publishers && idx !== currentGame?.publishers.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="user-defined-tags">
        <div className="glance-tags-label">Popular user-defined tags for this product:</div>
        {!isViewport960 ? (
          <div className="glance-tags">
            {!tagsModalVisible &&
              currentGame?.tags?.slice(0, 4).map((tag) => (
                <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
                  {tag.name}
                </Link>
              ))}

            {!tagsModalVisible && currentGame?.tags && currentGame?.tags?.length > 3 && (
              <a className="game-tag" onClick={toggleModal}>
                +
              </a>
            )}

            {tagsModalVisible && (
              <TagsModal
                onClose={toggleModal}
                tags={currentGame?.tags?.map((tag) => tag.name) || []}
              />
            )}
          </div>
        ) : (
          currentGame?.tags?.map((tag) => (
            <Link key={tag.id} className="game-tag" href={`/search?tags=${tag.id}`}>
              {tag.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

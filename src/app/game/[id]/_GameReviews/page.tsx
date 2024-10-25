'use client';

// React
import { useCallback, useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Sanitization library
import { sanitize } from 'dompurify';

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Services
import { getGameReviews } from '@services/game/data';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';
import { getRatingClass, getRatingText } from '@utils/ratingUtils';

// Images
import defaultPFP from '@images/default-pfp.png';
import reviewIcon from '@images/icon_review_steam.png';
import negative from '@images/negative.png';
import positive from '@images/positive.png';

// Styles
import '@styles/game/GameReviews.scss';

// Types
import type { Review } from '@interfaces/review';
import type { JSX, SyntheticEvent } from 'react';
import type { GameReviewsProps } from './GameReviews.types';

export default function GameReviews({ game }: GameReviewsProps): JSX.Element {
  // Init
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'positive' | 'negative' | 'all'>('all');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isPartial, setIsPartial] = useState<boolean>(false);

  // Fetch data from API
  const fetchData = useCallback(async (): Promise<void> => {
    const newReviews = await getGameReviews(game.id, filter, sort, currentPage, 5);
    if (newReviews.length === 0) {
      setHasMore(false);
    } else {
      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setCurrentPage(currentPage + 1);
    }
  }, [filter, sort, currentPage, game.id]);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set partial view state
  useEffect(() => {
    if (reviews.length > 0) {
      const firstReviewContentLines = reviews[0].content
        .split(/<br\s*\/?>/)
        .filter((line) => line.trim() !== '');
      setIsPartial(firstReviewContentLines.length >= (isViewport960 ? 6 : 12));
    }
  }, [reviews, isViewport960]);

  // Event handlers
  const handleReviewTypeChange = (e: SyntheticEvent<HTMLSelectElement, Event>): void => {
    const value = e.currentTarget.value as 'positive' | 'negative' | 'all';
    if (['positive', 'negative', 'all'].includes(value)) {
      setFilter(value);
    } else {
      toast.error('Invalid filter type');
    }
  };

  const handleSortTypeChange = (e: SyntheticEvent<HTMLSelectElement, Event>): void => {
    const value = e.currentTarget.value as 'newest' | 'oldest';
    if (['newest', 'oldest'].includes(value)) {
      setSort(value);
    } else {
      toast.error('Invalid sort type');
    }
  };

  const handleReadMoreClick = (): void => {
    setIsPartial((prevIsPartial) => !prevIsPartial);
  };

  return (
    <div className="reviews-content">
      <div className="page-content">
        {reviews.length === 0 ? (
          <div className="review-comment">No reviews yet</div>
        ) : (
          <>
            <h2 className="user-reviews-header">Customer reviews</h2>
            <div className="overall-summary-container">
              <div className="overall-summary">
                <div className="overall-section">
                  <div className="title">Overall Reviews:</div>
                  <span className={`game-review-summary ${getRatingClass(game.averageRating)}`}>
                    {getRatingText(game.averageRating, game.reviewsCount)}
                  </span>
                  <span>({game.reviewsCount.toString()} reviews)</span>
                </div>
              </div>
            </div>
            <div className="filter-options">
              <div className="review-type">
                <span className="title">Review Type:</span>
                <select id="review-type" value={filter} onChange={handleReviewTypeChange}>
                  <option value="all">All</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
              <div className="review-type">
                <span className="title">Sort By Date:</span>
                <select id="sort-type" value={sort} onChange={handleSortTypeChange}>
                  {' '}
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            <div className="reviews-info">
              <div className="reviews-filter-score">
                <span>
                  Showing <b>{reviews.length}</b> reviews that match the filters above
                </span>
                {' ( '}
                <span className={`game-review-summary ${getRatingClass(game.averageRating)}`}>
                  {getRatingText(game.averageRating, game.reviewsCount)}
                </span>
                {' ) '}
              </div>
            </div>
            <div className="reviews-summary">
              <div className="reviews-sub-header">{`${filter} User Reviews`}</div>
              <InfiniteScroll
                dataLength={reviews.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<div className="review-comment">Loading...</div>}
              >
                {reviews.map((review) => (
                  <div className={`review-box ${isPartial ? 'partial' : ''}`} key={review.id}>
                    <div className="leftcol">
                      <div className="avatar">
                        <Link href={`/user/${review.user?.id}`}>
                          <div
                            className={`player-avatar ${review.user?.isActive ? 'online' : 'offline'}`}
                          >
                            <img src={review.user?.profilePicture || defaultPFP.src} alt="pfp" />
                          </div>
                        </Link>
                      </div>
                      <div className="person-name">
                        <Link href={`/user/${review.user?.id}`}>{review.user?.username}</Link>
                      </div>
                      {isViewport630 && (
                        <div className="post-date"> Posted: {formatDate(review.date)}</div>
                      )}
                    </div>
                    <div className="rightcol">
                      <div className="vote-header">
                        <div className="thumb">
                          <Image
                            src={review.positive ? positive : negative}
                            alt={review.positive ? 'positive' : 'negative'}
                          />
                        </div>
                        <Image className="review-source" src={reviewIcon} alt="review source" />
                        <div className="title">
                          {!review.positive ? 'Not Recommended' : 'Recommended'}
                        </div>
                      </div>
                      {!isViewport630 && (
                        <div className="post-date"> Posted: {formatDate(review.date)}</div>
                      )}
                      <div className="content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              typeof window !== 'undefined'
                                ? sanitize(review.content)
                                : review.content,
                          }}
                        />
                        {isPartial ? <div className="gradient" /> : ''}
                      </div>
                      {isPartial && (
                        <div className="posted">
                          <div className="view-more">
                            <a onClick={handleReadMoreClick}>Read More</a>
                          </div>{' '}
                          &nbsp;
                          <div className="hr" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

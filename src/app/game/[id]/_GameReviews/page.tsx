'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Sanitization library
import DomPurify from 'dompurify';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Utils
import { getRatingClass, getRatingText } from 'utils/ratingUtils';

// Images
import defaultPFP from 'images/default-pfp.png';
import reviewIcon from 'images/icon_review_steam.png';
import negative from 'images/negative.png';
import positive from 'images/positive.png';

// Styles
import 'styles/game/GameReviews.scss';

// Types
import type { FC, JSX, SyntheticEvent } from 'react';
import type { Review } from 'types/review.types';
import type { GameReviewsProps } from './GameReviews.types';

const GameReviews: FC<GameReviewsProps> = ({ game }): JSX.Element => {
  // Init
  const sanitize = DomPurify.sanitize;
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('Date');
  const [isPartial, setIsPartial] = useState<boolean>(false);
  // TODO: Set image source
  const [imgSrc, setImgSrc] = useState<string>('');

  const handleNoImage = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.stopPropagation();
    setImgSrc(defaultPFP.src);
  };

  const totalReviews = game.reviews.length;
  const positiveReviews = game.reviews.filter((review: Review) => review.positive).length;
  // TODO: refetch positve percentage from backend
  const positivePercentage = (positiveReviews / totalReviews) * 100;

  const summary = getRatingText(positivePercentage);
  const ratingClass = getRatingClass(positivePercentage);

  const filterReviews = (): Review[] => {
    // Filter reviews based on positive or negative
    const filteredReviews: Review[] = game.reviews.filter((review: Review) => {
      if (selectedFilter === 'All') {
        return true;
      } else if (selectedFilter === 'Positive') {
        return review.positive;
      } else if (selectedFilter === 'Negative') {
        return !review.positive;
      }
      return true;
    });

    // Sort reviews based on newest or oldest
    if (sortOption === 'newest') {
      return filteredReviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOption === 'oldest') {
      return filteredReviews.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      return filteredReviews;
    }
  };

  const filteredReviews: Review[] = filterReviews();
  const totalFilteredReviews: number = filteredReviews.length;

  useEffect(() => {
    if (game.reviews.length > 0) {
      const firstReviewContentLines = game.reviews[0].content
        .split(/<br\s*\/?>/)
        .filter((line) => line.trim() !== '');
      setIsPartial(firstReviewContentLines.length >= (isViewport960 ? 6 : 12));
    }
  }, [game.reviews, isViewport960]);

  const handleReviewTypeChange = (e: SyntheticEvent<HTMLSelectElement, Event>): void => {
    setSelectedFilter(e.currentTarget.value);
  };

  const handleSortTypeChange = (e: SyntheticEvent<HTMLSelectElement, Event>): void => {
    setSortOption(e.currentTarget.value);
  };

  const handleReadMoreClick = (): void => {
    setIsPartial((prevIsPartial) => !prevIsPartial);
  };

  return (
    <div className="reviews-content">
      <div className="page-content">
        <h2 className="user-reviews-header">Customer reviews</h2>
        <div className="overall-summary-container">
          <div className="overall-summary">
            <div className="overall-section">
              <div className="title">Overall Reviews:</div>
              <span className={`game-review-summary ${ratingClass}`}>{summary || 'N/A'} </span>
              <span>({totalReviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
        <div className="filter-options">
          <div className="review-type">
            <span className="title">Review Type:</span>
            <select id="review-type" value={selectedFilter} onChange={handleReviewTypeChange}>
              <option value="All">All</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
          <div className="review-type">
            <span className="title">Sort By Date:</span>
            <select id="sort-type" value={sortOption} onChange={handleSortTypeChange}>
              {' '}
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        <div className="reviews-info">
          <div className="reviews-filter-score">
            <span>
              Showing <b>{totalFilteredReviews}</b> reviews that match the filters above
            </span>
            {' ( '}
            <span className={`game-review-summary ${ratingClass}`}>{summary || 'N/A'} </span>
            {' ) '}
          </div>
        </div>
        <div className="reviews-summary">
          <div className="reviews-sub-header">{`${selectedFilter} User Reviews`}</div>
          {filteredReviews.map((review) => (
            <div className={`review-box ${isPartial ? 'partial' : ''}`} key={review.id}>
              <div className="leftcol">
                <div className="avatar">
                  {/* TODO: userId backend logic */}
                  <Link
                    // href={`/id/${userId}`}
                    href="/"
                  >
                    {/* TODO: isOnline backend logic */}
                    <div
                      className={`player-avatar ${
                        {
                          /*isOnline ? "online" : "offline"*/
                        }
                      }`}
                    >
                      <img src={imgSrc || defaultPFP.src} onError={handleNoImage} alt="pfp" />
                    </div>
                  </Link>
                </div>
                <div className="person-name">
                  <Link
                    // href={`/id/${userId}`}
                    href="/"
                  >
                    {review.user.username}
                  </Link>
                </div>
                {isViewport630 && (
                  <div className="post-date"> Posted: {review.date.toLocaleDateString()}</div>
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
                  <div className="post-date"> Posted: {review.date.toLocaleDateString()}</div>
                )}
                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitize(review.content),
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
                    <div className="hr"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameReviews;

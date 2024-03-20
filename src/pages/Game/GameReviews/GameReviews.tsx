import { FC, useEffect, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { gamesData, ReviewEntry } from 'services/gameData';
import DOMPurify from 'dompurify';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import './GameReviews.scss';

const GameReviews: FC<{ game: gamesData }> = ({ game }) => {
  const navigate = useSoftNavigate();
  const isViewport960 = useResponsiveViewport(960);
  const isViewport630 = useResponsiveViewport(630);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('Date');
  const [isPartial, setIsPartial] = useState<boolean>(false);
  // TODO: Set image source
  const [imgSrc, setImgSrc] = useState('image_link');

  const handleNoImage = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setImgSrc('/images/default-pfp.png');
  };

  let positivePercentage: number = 0;

  function getReviewSummary(
    positiveCount: number,
    _negativeCount: number,
    totalReviews: number,
  ) {
    positivePercentage = (positiveCount / totalReviews) * 100;

    if (positivePercentage >= 90) return 'Overwhelmingly Positive';
    if (positivePercentage >= 80) return 'Very Positive';
    if (positivePercentage >= 75) return 'Mostly Positive';
    if (positivePercentage > 40 && positivePercentage < 75) return 'Mixed';
    if (positivePercentage <= 10) return 'Overwhelmingly Negative';
    if (positivePercentage <= 20) return 'Very Negative';
    if (positivePercentage <= 40) return 'Mostly Negative';
  }

  const totalReviews = game.reviews.length;
  const positiveReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'positive',
  ).length;
  const negativeReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'negative',
  ).length;

  const summary = getReviewSummary(
    positiveReviews,
    negativeReviews,
    totalReviews,
  );

  const filterReviews = () => {
    // Filter reviews based on positive or negative
    const filteredReviews = game.reviews.filter((review: ReviewEntry) => {
      if (selectedFilter === 'All') {
        return true;
      } else if (selectedFilter === 'Positive') {
        return review.type === 'positive';
      } else if (selectedFilter === 'Negative') {
        return review.type === 'negative';
      }
      return true;
    });

    // Sort reviews based on newest or oldest
    if (sortOption === 'newest') {
      return filteredReviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (sortOption === 'oldest') {
      return filteredReviews.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    } else {
      return filteredReviews;
    }
  };

  const filteredReviews = filterReviews();
  const totalFilteredReviews = filteredReviews.length;

  useEffect(() => {
    if (game.reviews.length > 0) {
      const firstReviewContentLines = game.reviews[0].content
        .split(/<br\s*\/?>/)
        .filter(line => line.trim() !== '');
      setIsPartial(firstReviewContentLines.length >= (isViewport960 ? 6 : 12));
    }
  }, [game.reviews, isViewport960]);

  return (
    <div className="reviews-content">
      <div className="page-content">
        <h2 className="user-reviews-header">Customer reviews</h2>
        <div className="overall-summary-container">
          <div className="overall-summary">
            <div className="overall-section">
              <div className="title">Overall Reviews:</div>
              <span
                className={`game-review-summary ${
                  positivePercentage < 75 && positivePercentage > 40
                    ? 'mixed'
                    : positivePercentage >= 75
                      ? 'positive'
                      : positivePercentage >= 40
                        ? 'negative'
                        : ''
                }`}
              >
                {summary || 'N/A'}{' '}
              </span>
              <span>({totalReviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
        <div className="filter-options">
          <div className="review-type">
            <span className="title">Review Type:</span>
            <select
              id="review-type"
              value={selectedFilter}
              onChange={e => setSelectedFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
          <div className="review-type">
            <span className="title">Sort By Date:</span>
            <select
              id="sort-type"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              {' '}
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        <div className="reviews-info">
          <div className="reviews-filter-score">
            <span>
              Showing <b>{totalFilteredReviews}</b> reviews that match the
              filters above
            </span>
            {' ( '}
            <span
              className={`game-review-summary ${
                positivePercentage < 75 && positivePercentage > 40
                  ? 'mixed'
                  : positivePercentage >= 75
                    ? 'positive'
                    : positivePercentage >= 40
                      ? 'negative'
                      : ''
              }`}
            >
              {summary || 'N/A'}{' '}
            </span>
            {' ) '}
          </div>
        </div>
        <div className="reviews-summary">
          <div className="reviews-sub-header">{`${selectedFilter} User Reviews`}</div>
          {filteredReviews.map((review, index) => (
            <div
              className={`review-box ${isPartial ? 'partial' : ''}`}
              key={index}
            >
              <div className="leftcol">
                <div className="avatar">
                  {/* TODO: userId backend logic */}
                  <a
                    onClick={e => {
                      navigate(`/id/${{ /*userId*/ }}`, e);
                    }}
                  >
                    {/* TODO: isOnline backend logic */}
                    <div
                      className={`player-avatar ${
                        {
                          /*isOnline ? "online" : "offline"*/
                        }
                      }`}
                    >
                      <img src={imgSrc} onError={handleNoImage} alt="pfp" />
                    </div>
                  </a>
                </div>
                <div className="person-name">
                  <a
                    onClick={e => {
                      navigate(`/id/${{ /*userId*/ }}`, e);
                    }}
                  >
                    {review.user}
                  </a>
                </div>
                {isViewport630 && (
                  <div className="post-date"> Posted: {review.date}</div>
                )}
              </div>
              <div className="rightcol">
                <div className="vote-header">
                  <div className="thumb">
                    <img src={`/images/${review.type}.png`} alt={review.type} />
                  </div>
                  <img
                    className="review-source"
                    src="/images/icon_review_steam.png"
                  />
                  <div className="title">
                    {review.type === 'negative'
                      ? 'Not Recommended'
                      : 'Recommended'}
                  </div>
                </div>
                {!isViewport630 && (
                  <div className="post-date"> Posted: {review.date}</div>
                )}
                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(review.content),
                    }}
                  />
                  {isPartial ? <div className="gradient" /> : ''}
                </div>
                {isPartial && (
                  <div className="posted">
                    <div className="view-more">
                      <a
                        onClick={() =>
                          setIsPartial(prevIsPartial => !prevIsPartial)
                        }
                      >
                        Read More
                      </a>
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

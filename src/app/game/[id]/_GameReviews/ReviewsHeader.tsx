// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setFilter, setSort } from '@store/features/game/gameSlice';

// Utils
import { getRatingClass, getRatingText } from '@utils/ratingUtils';

// Types
import type { ReviewFilter, ReviewSort } from '@custom-types/reviews';
import type { ChangeEvent } from 'react';

export default function ReviewsHeader() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentGame, reviews, filter, sort } = useAppSelector((state) => state.game);

  //---------------------------- Event Handlers ---------------------------//
  const handleReviewTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as ReviewFilter;
    dispatch(setFilter(value));
  };

  const handleSortTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as ReviewSort;
    dispatch(setSort(value));
  };

  //-------------------------------- Render -------------------------------//
  if (!currentGame) return null;
  return (
    <>
      <h2 className="user-reviews-header">Customer reviews</h2>
      <div className="overall-summary-container">
        <div className="overall-summary">
          <div className="overall-section">
            <div className="title">Overall Reviews:</div>
            <span className={`game-review-summary ${getRatingClass(currentGame.averageRating)}`}>
              {getRatingText(currentGame.averageRating, currentGame.reviewsCount)}
            </span>
            &nbsp;
            <span>({currentGame.reviewsCount.toString()} reviews)</span>
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
        </div>
      </div>
    </>
  );
}

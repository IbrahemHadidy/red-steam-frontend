// React
import { useEffect } from 'react';

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeReviews, setCurrentPage } from '@store/features/game/gameSlice';

// Redux Thunks
import { getReviews } from '@store/features/game/gameThunks';

// Components
import Loader from '@components/Loader';
import Review from './Review';
import ReviewsHeader from './ReviewsHeader';

export default function GameReviews() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentGame, isGameFetching, reviews, filter, hasMore, currentPage } = useAppSelector(
    (state) => state.game
  );

  //------------------------------- OnMount -------------------------------//
  useEffect(() => {
    dispatch(initializeReviews());
  }, [dispatch]);

  //---------------------------- Event Handlers ---------------------------//
  const handleNextItems = async (): Promise<void> => {
    dispatch(setCurrentPage(currentPage + 1));
    await dispatch(getReviews());
  };

  //-------------------------------- Render -------------------------------//
  if (isGameFetching || !currentGame) {
    return <Loader />;
  } else {
    return (
      <div className="reviews-content">
        <div className="page-content">
          <>
            <ReviewsHeader />

            {reviews.length === 0 ? (
              <div className="review-comment">No reviews yet</div>
            ) : (
              <div className="reviews-summary">
                <div className="reviews-sub-header">{`${filter} User Reviews`}</div>

                <InfiniteScroll
                  dataLength={reviews.length}
                  next={handleNextItems}
                  hasMore={hasMore}
                  loader={<div className="review-comment">Loading...</div>}
                  endMessage={
                    <div className="review-comment">No {reviews.length > 0 && 'more '}reviews</div>
                  }
                >
                  {reviews.map((review) => (
                    <Review review={review} key={review.id} />
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </>
        </div>
      </div>
    );
  }
}

'use client';

// React
import { useEffect } from 'react';

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeReviews } from '@store/features/game/gameSlice';

// Redux Thunks
import { getReviews } from '@store/features/game/gameThunks';

// Components
import Loader from '@components/Loader';
import Review from './Review';
import ReviewsHeader from './ReviewsHeader';

export default function GameReviews() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { currentGame, isGameFetching, reviews, filter, hasMore } = useAppSelector(
    (state) => state.game
  );

  //------------------------------- OnMount -------------------------------//
  useEffect(() => {
    dispatch(initializeReviews());
  }, [dispatch]);

  //--------------------------- Render UI Section -------------------------//
  if (isGameFetching || !currentGame) {
    return <Loader />;
  } else {
    return (
      <div className="reviews-content">
        <div className="page-content">
          {reviews.length === 0 ? (
            <div className="review-comment">No reviews yet</div>
          ) : (
            <>
              <ReviewsHeader />

              <div className="reviews-summary">
                <div className="reviews-sub-header">{`${filter} User Reviews`}</div>
                <InfiniteScroll
                  dataLength={reviews.length}
                  next={getReviews}
                  hasMore={hasMore}
                  loader={<div className="review-comment">Loading...</div>}
                  endMessage={<div className="review-comment">No more reviews</div>}
                >
                  {reviews.map((review) => (
                    <Review review={review} key={review.id} />
                  ))}
                </InfiniteScroll>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

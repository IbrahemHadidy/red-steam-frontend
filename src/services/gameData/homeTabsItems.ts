import type { Game } from 'types/game.types';
import gameData from './gameData';

export const newAndTrending: Game[] = gameData
  .sort((a, b) => {
    const dateA = Date.parse(a.releaseDate.toISOString());
    const dateB = Date.parse(b.releaseDate.toISOString());
    return dateB - dateA; // Sort in descending order
  })
  .slice(0, 10);

export const topSellers: Game[] = gameData
  .sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.positive).length;
    const positiveReviewsB = b.reviews.filter((review) => review.positive).length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
  })
  .slice(0, 10);

// TODO: Mark as Coming SOON!
export const popularUpcoming: Game[] = gameData
  .sort((a, b) => {
    const dateA = Date.parse(a.releaseDate.toISOString());
    const dateB = Date.parse(b.releaseDate.toISOString());
    return dateB - dateA; // Sort in descending order
  })
  .slice(0, 10);

export const specials: Game[] = gameData
  .sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.positive).length;
    const positiveReviewsB = b.reviews.filter((review) => review.positive).length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
  })
  .slice(0, 10);

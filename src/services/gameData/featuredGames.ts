import gameData from './gameData';

// Types
import { Game } from 'types/game.types';

// Sort by positive reviews first
const sortedByReviews = gameData.sort((a, b) => {
  const positiveReviewsA: number = a.reviews.filter((review) => review.positive).length;
  const positiveReviewsB: number = b.reviews.filter((review) => review.positive).length;
  return positiveReviewsB - positiveReviewsA;
});

// Sort by release date
const sortedByDate = gameData.sort((a, b) => {
  const dateA: number = Date.parse(a.releaseDate.toISOString());
  const dateB: number = Date.parse(b.releaseDate.toISOString());
  return dateB - dateA;
});

const uniqueGames = [];
const seenIds: Set<number> = new Set();

let indexByReviews: number = 0,
  indexByDate: number = 0;
while (uniqueGames.length < 12) {
  const gameByReviews: Game = sortedByReviews[indexByReviews];
  const gameByDate: Game = sortedByDate[indexByDate];

  if (
    gameByReviews.reviews.filter((review) => review.positive).length >=
    gameByDate.reviews.filter((review) => review.positive).length
  ) {
    if (!seenIds.has(gameByReviews.id)) {
      uniqueGames.push(gameByReviews);
      seenIds.add(gameByReviews.id);
    }
    indexByReviews++;
  } else {
    if (!seenIds.has(gameByDate.id)) {
      uniqueGames.push(gameByDate);
      seenIds.add(gameByDate.id);
    }
    indexByDate++;
  }
}

const featuredGames: Game[] = uniqueGames;

export default featuredGames;

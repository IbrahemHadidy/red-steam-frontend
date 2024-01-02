import gameData from "../../Game/gameData";

// Sort by positive reviews first
const sortedByReviews = gameData.sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.type === "positive").length;
    const positiveReviewsB = b.reviews.filter((review) => review.type === "positive").length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
});

// Sort by release date
const sortedByDate = gameData.sort((a, b) => {
    const dateA = Date.parse(a.releaseDate);
    const dateB = Date.parse(b.releaseDate);
    return dateB - dateA; // Sort in descending order
});

const uniqueGames = [];
const seenIds = new Set();

let indexByReviews = 0, indexByDate = 0;
while (uniqueGames.length < 12) {
    const gameByReviews = sortedByReviews[indexByReviews];
    const gameByDate = sortedByDate[indexByDate];

    // Choose the game which has more positive reviews
    if (gameByReviews.reviews.filter((review) => review.type === "positive").length >= gameByDate.reviews.filter((review) => review.type === "positive").length) {
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

const featuredGames = uniqueGames;

export default featuredGames;

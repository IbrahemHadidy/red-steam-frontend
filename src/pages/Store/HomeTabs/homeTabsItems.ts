import gameData, { gamesData } from "../../Game/gameData";

export const newAndTrending: gamesData[] = gameData.sort((a, b) => {
    const dateA = Date.parse(a.releaseDate);
    const dateB = Date.parse(b.releaseDate);
    return dateB - dateA; // Sort in descending order
}).slice(0, 10);

export const topSellers: gamesData[] = gameData.sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.type === "positive").length;
    const positiveReviewsB = b.reviews.filter((review) => review.type === "positive").length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
}).slice(0, 10);

export const popularUpcoming: gamesData[] = gameData.sort((a, b) => {
    const dateA = Date.parse(a.releaseDate);
    const dateB = Date.parse(b.releaseDate);
    return dateB - dateA; // Sort in descending order
}).slice(0, 10);

export const specials: gamesData[] = gameData.sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.type === "positive").length;
    const positiveReviewsB = b.reviews.filter((review) => review.type === "positive").length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
}).slice(0, 10);
	

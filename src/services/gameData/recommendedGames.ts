import gameData from "services/gameData/gameData";

const recommended = gameData.sort((a, b) => {
    const positiveReviewsA = a.reviews.filter((review) => review.type === "positive").length;
    const positiveReviewsB = b.reviews.filter((review) => review.type === "positive").length;
    return positiveReviewsB - positiveReviewsA; // Sort in descending order of positive reviews
})

export default recommended;

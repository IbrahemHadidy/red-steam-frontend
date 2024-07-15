const getHoverInfo = (positiveReviews: number, negativeReviews: number) => {
  const totalReviews = positiveReviews + negativeReviews;
  const positivePercentage = (positiveReviews / totalReviews) * 100;

  return totalReviews === 0
    ? 'No reviews yet.'
    : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
};

export default getHoverInfo;

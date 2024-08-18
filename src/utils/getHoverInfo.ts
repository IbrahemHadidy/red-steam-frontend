const getHoverInfo = (positiveReviews: number, negativeReviews: number): string => {
  const totalReviews: number = positiveReviews + negativeReviews;
  const positivePercentage: number = (positiveReviews / totalReviews) * 100;

  return totalReviews === 0
    ? 'No reviews yet.'
    : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
};

export default getHoverInfo;

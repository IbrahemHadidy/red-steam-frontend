export const getRatingClass = (positivePercentage: number): string => {
  if (positivePercentage < 75 && positivePercentage > 40) {
    return 'mixed';
  } else if (positivePercentage >= 75) {
    return 'positive';
  } else if (positivePercentage >= 40) {
    return 'negative';
  } else {
    return '';
  }
};

export const getRatingText = (positivePercentage: number): string => {
  let ratingText: string = '';

  if (positivePercentage >= 90) {
    ratingText = 'Overwhelmingly Positive';
  } else if (positivePercentage >= 80) {
    ratingText = 'Very Positive';
  } else if (positivePercentage >= 75) {
    ratingText = 'Mostly Positive';
  } else if (positivePercentage > 40 && positivePercentage < 75) {
    ratingText = 'Mixed';
  } else if (positivePercentage <= 10) {
    ratingText = 'Overwhelmingly Negative';
  } else if (positivePercentage <= 20) {
    ratingText = 'Very Negative';
  } else if (positivePercentage <= 40) {
    ratingText = 'Mostly Negative';
  } else {
    ratingText = 'No reviews yet.';
  }

  return ratingText;
};

export const getHoverInfo = (positiveReviews: number, totalReviews: number): string => {
  const positivePercentage: number = (positiveReviews / totalReviews) * 100;

  return totalReviews === 0
    ? 'No reviews yet.'
    : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
};

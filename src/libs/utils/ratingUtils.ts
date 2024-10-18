/**
 * Get rating class
 * @param positivePercentage Percentage of positive reviews
 * @returns Rating class
 */
export function getRatingClass(positivePercentage: number): 'positive' | 'negative' | 'mixed' | '' {
  if (positivePercentage < 75 && positivePercentage > 40) {
    return 'mixed';
  } else if (positivePercentage >= 75) {
    return 'positive';
  } else if (positivePercentage >= 40) {
    return 'negative';
  } else {
    return '';
  }
}

/**
 * Get rating text
 * @param positivePercentage Percentage of positive reviews
 * @param totalReviews Total number of reviews
 * @returns Rating text
 */
export function getRatingText(positivePercentage: number, totalReviews: number): string {
  let ratingText: string = '';

  if (totalReviews === 0) {
    ratingText = 'N/A';
  } else if (totalReviews <= 50) {
    if (positivePercentage < 60 && positivePercentage > 40) {
      ratingText = 'Mixed';
    } else if (positivePercentage >= 60) {
      ratingText = 'Positive';
    } else if (positivePercentage >= 40) {
      ratingText = 'Negative';
    }
  } else if (positivePercentage >= 90) {
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
  }

  return ratingText;
}

/**
 * Get hover info
 * @param positivePercentage Percentage of positive reviews
 * @param totalReviews Total number of reviews
 * @returns Hover info
 */
export function getHoverInfo(positivePercentage: number, totalReviews: number): string {
  return totalReviews === 0
    ? 'No reviews yet.'
    : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
}

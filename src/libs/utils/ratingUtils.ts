// Constants
import {
  MAXIMUM_NEGATIVE_PERCENTAGE,
  MAXIMUM_OVERWHELMINGLY_POSITIVE_PERCENTAGE,
  MAXIMUM_POSITIVE_PERCENTAGE,
  MAXIMUM_VERY_NEGATIVE_PERCENTAGE,
  MAXIMUM_VERY_POSITIVE_PERCENTAGE,
  MINIMUM_MIXED_PERCENTAGE,
  MINIMUM_OVERWHELMINGLY_NEGATIVE_PERCENTAGE,
  MINIMUM_POSITIVE_PERCENTAGE,
} from '@config/constants/rating';

/**
 * Get rating class
 * @param positivePercentage Percentage of positive reviews
 * @returns Rating class
 */
export function getRatingClass(positivePercentage: number): 'positive' | 'negative' | 'mixed' | '' {
  if (
    positivePercentage < MINIMUM_POSITIVE_PERCENTAGE &&
    positivePercentage > MINIMUM_MIXED_PERCENTAGE
  ) {
    return 'mixed';
  } else if (positivePercentage >= MINIMUM_POSITIVE_PERCENTAGE) {
    return 'positive';
  } else if (positivePercentage >= MINIMUM_MIXED_PERCENTAGE) {
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
    if (positivePercentage < 60 && positivePercentage > MINIMUM_MIXED_PERCENTAGE) {
      ratingText = 'Mixed';
    } else if (positivePercentage >= 60) {
      ratingText = 'Positive';
    } else if (positivePercentage >= MINIMUM_MIXED_PERCENTAGE) {
      ratingText = 'Negative';
    }
  } else if (positivePercentage >= MAXIMUM_OVERWHELMINGLY_POSITIVE_PERCENTAGE) {
    ratingText = 'Overwhelmingly Positive';
  } else if (positivePercentage >= MAXIMUM_VERY_POSITIVE_PERCENTAGE) {
    ratingText = 'Very Positive';
  } else if (positivePercentage >= MAXIMUM_POSITIVE_PERCENTAGE) {
    ratingText = 'Mostly Positive';
  } else if (
    positivePercentage > MINIMUM_MIXED_PERCENTAGE &&
    positivePercentage < MAXIMUM_POSITIVE_PERCENTAGE
  ) {
    ratingText = 'Mixed';
  } else if (positivePercentage <= MINIMUM_OVERWHELMINGLY_NEGATIVE_PERCENTAGE) {
    ratingText = 'Overwhelmingly Negative';
  } else if (positivePercentage <= MAXIMUM_VERY_NEGATIVE_PERCENTAGE) {
    ratingText = 'Very Negative';
  } else if (positivePercentage <= MAXIMUM_NEGATIVE_PERCENTAGE) {
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

export interface HoverSummary {
  title: string;
  date: string;
  screenshots: string[];
  description: string;
  positivePercentage: number;
  totalReviews: number;
  tags: string[];
  leftArrow?: boolean;
  rightArrow?: boolean;
}

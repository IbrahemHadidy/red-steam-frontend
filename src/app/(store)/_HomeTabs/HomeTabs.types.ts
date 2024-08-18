import type { Game } from 'types/game.types';
import type { Review } from 'types/review.types';

export interface GetGameDetails {
  gameName: string;
  reviews: Review[];
  tags: string[];
  screenshots: string[];
}

export interface TabContentProps {
  items: Game[];
  title: string;
  isOpened: boolean;
  seeMore: string;
  onTabHover: (idx: number | null) => void;
}

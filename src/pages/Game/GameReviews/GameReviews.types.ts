import type { gamesData } from 'services/gameData/gameData';

export interface GameReviewsProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

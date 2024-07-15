import type { gamesData } from 'services/gameData/gameData';

export interface GameContentProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface RightContentProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface LeftContentProps {
  game: gamesData;
  isViewport630: boolean;
}

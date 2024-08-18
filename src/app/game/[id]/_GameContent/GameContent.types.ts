import type { Game } from 'types/game.types';
type GameData = Omit<Game, 'languages' | 'totalSales' | 'averageRating' | 'reviewsCount'>;

export interface GameContentProps {
  game: GameData;
}

export interface RightContentProps {
  game: GameData;
}

export interface LeftContentProps {
  game: GameData;
}

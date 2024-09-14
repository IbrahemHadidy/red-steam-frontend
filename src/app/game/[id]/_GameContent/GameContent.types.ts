import type { Game } from '@entities/game.entity';
type GameData = Omit<Game, 'languages' | 'totalSales'>;

export interface GameContentProps {
  game: GameData;
}

export interface RightContentProps {
  game: GameData;
}

export interface LeftContentProps {
  game: GameData;
}

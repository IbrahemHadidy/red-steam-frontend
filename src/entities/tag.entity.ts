import type { Game } from '@entities/game.entity';

export interface Tag {
  id: number;
  name: string;
  games: Game[];
}

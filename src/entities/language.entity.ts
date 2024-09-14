import type { Game } from '@entities/game.entity';

export interface Language {
  id: number;
  name: string;
  games?: Game[];
}

import type { Game } from '@entities/game.entity';

export interface Feature {
  id: number;
  name: string;
  link: string;
  icon: { type: string; data: number[] };
  games?: Game[];
}

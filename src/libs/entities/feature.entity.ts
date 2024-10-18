import type { Game } from '@entities/game.entity';

export interface Feature {
  readonly id: number;
  readonly name: string;
  readonly link: string;
  readonly icon: { type: string; data: number[] };
  readonly games?: Game[];
}

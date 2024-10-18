import type { Game } from '@entities/game.entity';

export interface Language {
  readonly id: number;
  readonly name: string;
  readonly games?: Game[];
}

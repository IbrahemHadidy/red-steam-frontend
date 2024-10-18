import type { Game } from '@entities/game.entity';

export interface Tag {
  readonly id: number;
  readonly name: string;
  readonly games: Game[];
}

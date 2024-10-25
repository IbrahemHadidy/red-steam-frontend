import type { Game } from '@interfaces/game';

export interface Tag {
  readonly id: number;
  readonly name: string;
  readonly games: Game[];
}

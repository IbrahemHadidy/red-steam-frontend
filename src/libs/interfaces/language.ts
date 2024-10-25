import type { Game } from '@interfaces/game';

export interface Language {
  readonly id: number;
  readonly name: string;
  readonly games?: Game[];
}

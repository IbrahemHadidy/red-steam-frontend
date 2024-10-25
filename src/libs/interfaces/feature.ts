import type { Game } from '@interfaces/game';

export interface Feature {
  readonly id: number;
  readonly name: string;
  readonly link: string;
  readonly icon: { type: string; data: number[] };
  readonly games?: Game[];
}

import type { Game } from '@interfaces/game';

export interface Company {
  readonly id: number;
  readonly name: string;
  readonly website: string;
  readonly games?: Game[];
}

export interface Publisher extends Company {}
export interface Developer extends Company {}

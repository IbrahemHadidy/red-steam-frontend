import type { Game } from '@entities/game.entity';

export interface Company {
  id: number;
  name: string;
  website: string;
  games?: Game[];
}

export interface Publisher extends Company {}
export interface Developer extends Company {}

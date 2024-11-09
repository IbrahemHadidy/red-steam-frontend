import type { Game } from '@interfaces/game';
import type { User } from '@interfaces/user';

export interface Review {
  readonly id: number;
  readonly user?: User;
  readonly game?: Game;
  readonly positive: boolean;
  readonly date: string;
  readonly content: string;
}

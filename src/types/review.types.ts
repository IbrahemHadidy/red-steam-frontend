import type { Game } from 'types/game.types';
import type { User } from 'types/user.types';

export interface Review {
  id: number;
  user: User;
  game: Game;
  positive: boolean;
  date: Date;
  content: string;
}

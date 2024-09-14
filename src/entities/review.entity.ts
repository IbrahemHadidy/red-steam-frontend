import type { Game } from '@entities/game.entity';
import type { User } from '@entities/user.entity';

export interface Review {
  id: number;
  user?: User;
  game?: Game;
  positive: boolean;
  date: Date;
  content: string;
}

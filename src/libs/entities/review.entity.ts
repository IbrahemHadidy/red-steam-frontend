import type { Game } from '@entities/game.entity';
import type { User } from '@entities/user.entity';

export interface Review {
  readonly id: number;
  readonly user?: User;
  readonly game?: Game;
  readonly positive: boolean;
  readonly date: Date;
  readonly content: string;
}

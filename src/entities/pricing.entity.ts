import type { Game } from '@entities/game.entity';

export interface Pricing {
  id: number;
  free: boolean;
  basePrice: string;
  discount?: boolean;
  discountPercentage?: number;
  discountPrice?: string;
  discountStartDate?: Date;
  discountEndDate?: Date;
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  price: string;
  game?: Game;
}

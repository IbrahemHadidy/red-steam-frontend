import type { Game } from '@entities/game.entity';

export interface Pricing {
  readonly id: number;
  readonly free: boolean;
  readonly basePrice: string;
  readonly discount?: boolean;
  readonly discountPercentage?: number;
  readonly discountPrice?: string;
  readonly discountStartDate?: Date;
  readonly discountEndDate?: Date;
  readonly offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  readonly price: string;
  readonly game?: Game;
}

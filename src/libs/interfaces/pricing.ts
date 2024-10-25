import type { Game } from '@interfaces/game';

export interface Pricing {
  readonly id: number;
  readonly free: boolean;
  readonly basePrice: string;
  readonly discount?: boolean;
  readonly discountPercentage?: number;
  readonly discountPrice?: string;
  readonly discountStartDate?: string;
  readonly discountEndDate?: string;
  readonly offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  readonly price: string;
  readonly game?: Game;
}

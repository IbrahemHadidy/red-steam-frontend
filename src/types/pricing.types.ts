export interface Pricing {
  id: number;
  free: boolean;
  basePrice: number;
  discount?: boolean;
  discountPercentage?: number;
  discountPrice?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  price: number;
}

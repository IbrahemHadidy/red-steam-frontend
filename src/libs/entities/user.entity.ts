import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly country: string;
  readonly phoneNumber: string;
  readonly profilePicture: string;
  readonly tags: Tag[];
  readonly verificationToken: string;
  readonly isVerified: boolean;
  readonly phoneVerificationCode: string;
  readonly isPhoneVerified: boolean;
  readonly passwordResetToken: string;
  readonly isAdmin: boolean;
  readonly isActive: boolean;
  readonly isLoggedIn: boolean;
  readonly createdAt: Date;
  readonly wishlist: WishlistItem[];
  readonly cart: CartItem[];
  readonly library: LibraryItem[];
  readonly reviews?: Review[];
}

export interface BaseItem {
  readonly id: number;
  readonly addedOn: Date;
}

export interface WishlistItem extends BaseItem {}

export interface CartItem extends BaseItem {}

export interface LibraryItem extends BaseItem {}

import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';

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
  readonly createdAt: string;
  readonly wishlist: WishlistItem[];
  readonly cart: CartItem[];
  readonly library: LibraryItem[];
  readonly reviews?: Review[];
}

export interface BaseItem {
  readonly id: number;
  readonly addedOn: string;
}

export type WishlistItem = BaseItem;
export type CartItem = BaseItem;
export type LibraryItem = BaseItem;

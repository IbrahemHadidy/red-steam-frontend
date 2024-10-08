import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  country: string;
  phoneNumber: string;
  profilePicture: string;
  tags: Tag[];
  verificationToken: string;
  isVerified: boolean;
  phoneVerificationCode: string;
  isPhoneVerified: boolean;
  passwordResetToken: string;
  isAdmin: boolean;
  isActive: boolean;
  isLoggedIn: boolean;
  createdAt: Date;
  wishlist: WishlistItem[];
  cart: CartItem[];
  library: LibraryItem[];
  reviews?: Review[];
}

export interface BaseItem {
  id: number;
  addedOn: Date;
}

export interface WishlistItem extends BaseItem {}

export interface CartItem extends BaseItem {}

export interface LibraryItem extends BaseItem {}

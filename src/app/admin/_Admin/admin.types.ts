import type { Company } from '@entities/company.entity';
import type { Feature } from '@entities/feature.entity';
import type { Game } from '@entities/game.entity';
import type { Language } from '@entities/language.entity';
import type { Pricing } from '@entities/pricing.entity';
import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';
import type { User } from '@entities/user.entity';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export interface CreateProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language' | 'review' | 'offer';
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
  website?: string;
  setWebsite?: Dispatch<SetStateAction<string>>;
  handleIconChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  gameId?: number;
  setGameId?: Dispatch<SetStateAction<number>>;
  discountPrice?: number;
  setDiscountPrice?: Dispatch<SetStateAction<number>>;
  discountStartDate?: Date;
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  setOfferType?: Dispatch<SetStateAction<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>>;
  setDiscountStartDate?: Dispatch<SetStateAction<Date>>;
  discountEndDate?: Date;
  setDiscountEndDate?: Dispatch<SetStateAction<Date>>;
  icon?: string;
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
}

export interface ItemsListProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language' | 'review' | 'offer';
  submitted?: number;
}

export type Item = Feature | Company | Tag | Language | Review | Game | Pricing;

export interface EditModalProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language' | 'review' | 'user' | 'offer';
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: Item | User;
}

export interface DeleteModalProps {
  type:
    | 'developer'
    | 'publisher'
    | 'feature'
    | 'tag'
    | 'language'
    | 'review'
    | 'game'
    | 'user'
    | 'offer';
  gameName?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number | string;
}

export interface Admin extends CreateProps, ItemsListProps {}

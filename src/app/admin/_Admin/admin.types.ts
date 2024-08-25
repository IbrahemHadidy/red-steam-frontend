import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import type { Company } from 'types/company.types';
import type { Feature } from 'types/feature.types';
import type { Game } from 'types/game.types';
import type { Language } from 'types/language.types';
import type { Pricing } from 'types/pricing.types';
import type { Review } from 'types/review.types';
import type { Tag } from 'types/tag.types';
import type { User } from 'types/user.types';

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

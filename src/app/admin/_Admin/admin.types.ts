import type { Company } from '@interfaces/company';
import type { Feature } from '@interfaces/feature';
import type { Game } from '@interfaces/game';
import type { Language } from '@interfaces/language';
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';
import type { User } from '@interfaces/user';
import type Decimal from 'decimal.js';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export interface CreateProps {
  type:
    | 'developer'
    | 'publisher'
    | 'feature'
    | 'tag'
    | 'language'
    | 'review'
    | 'offer'
    | 'create-offer';
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
  website?: string;
  setWebsite?: Dispatch<SetStateAction<string>>;
  handleIconChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  game?: Game;
  discountPrice?: Decimal;
  setDiscountPrice?: Dispatch<SetStateAction<Decimal>>;
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
  type:
    | 'developer'
    | 'publisher'
    | 'feature'
    | 'tag'
    | 'language'
    | 'review'
    | 'offer'
    | 'create-offer';
  submitted?: number;
}

export type Item = Feature | Company | Tag | Language | Review | Game;

export interface EditModalProps {
  type:
    | 'developer'
    | 'publisher'
    | 'feature'
    | 'tag'
    | 'language'
    | 'review'
    | 'user'
    | 'offer'
    | 'create-offer';
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
    | 'offer'
    | 'create-offer';
  gameName?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number | string;
}

export interface AdminProps extends CreateProps, ItemsListProps {}

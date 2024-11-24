import type { Company } from '@interfaces/company';
import type { Feature } from '@interfaces/feature';
import type { Game } from '@interfaces/game';
import type { Language } from '@interfaces/language';
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';
import type { User } from '@interfaces/user';
import type { Dispatch, SetStateAction } from 'react';

export type Item = Feature | Company | Tag | Language | Review | Game;

export interface EditModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: Item | User;
}

export interface DeleteModalProps {
  gameName?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number | string;
}

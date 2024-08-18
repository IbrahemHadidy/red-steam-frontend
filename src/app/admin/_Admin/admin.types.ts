import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import type { Company } from 'types/company.types';
import type { Feature } from 'types/feature.types';
import type { Language } from 'types/language.types';
import type { Tag } from 'types/tag.types';

export interface CreateProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language';
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  website?: string;
  setWebsite?: Dispatch<SetStateAction<string>>;
  handleIconChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
}

export interface ItemsListProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language';
  submitted: number;
}

export type Item = Feature | Company | Tag | Language;

export interface EditModalProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language';
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: Item;
}

export interface DeleteModalProps {
  type: 'developer' | 'publisher' | 'feature' | 'tag' | 'language';
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number;
}

export interface Admin extends CreateProps, ItemsListProps {}

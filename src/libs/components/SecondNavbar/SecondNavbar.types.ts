import type { SetStateAction } from 'react';

export interface MenuItem {
  label: string;
  url: string;
  className: string;
  category?: string;
  specialClass?: string;
}

export interface GroupedMenuItem {
  menuTitle: string;
  categoryGroups: Record<string, MenuItem[]>;
}

export type menuTitle = string | SetStateAction<null>;

import { ChangeEvent, MouseEvent as ReactMouseEvent, RefObject } from 'react';

export type Filter = {
  name: string;
  check: 'unchecked' | 'included' | 'excluded';
};

export type FilterState = {
  price: Filter[];
  tag: Filter[];
  os: Filter[];
};

export interface SearchLeftProps {
  toggleDropdown: () => void;
  selectedOption: string;
  isOpen: boolean;
  selectOptions: string[];
  selectOption: (option: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  searchValue: string;
  handleSearch: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  isViewport960: boolean;
}

export interface SearchRightProps {
  rangeValue: number;
  setRangeValue: (value: number) => void;
  handlePriceChange: (value: number) => void;
  handlePriceRowClick: (row: Filter) => void;
  handleTagRowClick: (row: Filter) => void;
  handleTagRowExcludeClick: (row: Filter) => void;
  handleOSRowClick: (row: Filter) => void;
  getPriceRangeLabel: (value: number) => string;
  filters: FilterState;
  isViewport960: boolean;
}

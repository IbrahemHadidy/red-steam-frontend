import { ChangeEvent, MouseEvent, RefObject } from 'react';

export interface Filter {
  id: number;
  name: string;
  check: 'unchecked' | 'included' | 'excluded';
}

export interface FilterState {
  price: Filter[];
  option: Filter[];
  tag: Filter[];
  os: Filter[];
  publisher: Filter[];
  developer: Filter[];
  feature: Filter[];
  language: Filter[];
}

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
  handleSearchButton: (event: MouseEvent<HTMLButtonElement>) => void;
  hideLibrary: boolean;
  hideWishlist: boolean;
  hideCart: boolean;
  isViewport960: boolean;
}

export interface SearchRightProps {
  rangeValue: number | null;
  setRangeValue: (value: number) => void;
  handlePriceChange: (value: number) => void;
  handlePriceRowClick: (row: Filter) => void;
  handleOptionRowClick: (row: Filter) => void;
  handleTagRowClick: (row: Filter) => void;
  handleTagRowExcludeClick: (e: MouseEvent<HTMLImageElement>, row: Filter) => void;
  handleFeatureRowClick: (row: Filter) => void;
  handleDeveloperRowClick: (row: Filter) => void;
  handlePublisherRowClick: (row: Filter) => void;
  handleOSRowClick: (row: Filter) => void;
  handleLanguageRowClick: (row: Filter) => void;
  getPriceRangeLabel: (value: number) => string;
  filters: FilterState;
  isViewport960: boolean;
}

export interface PriceFilterBlockProps {
  filters: Filter[];
  rangeValue: number | null;
  setRangeValue: (value: number) => void;
  handlePriceChange: (value: number) => void;
  handlePriceRowClick: (row: Filter) => void;
  getPriceRangeLabel: (value: number) => string;
}

export interface FilterBlockProps {
  title: string;
  filters: Filter[];
  handleIncludeClick: (row: Filter) => void;
  handleExcludeClick?: (e: MouseEvent<HTMLImageElement>, row: Filter) => void;
  hasSearch: boolean;
}

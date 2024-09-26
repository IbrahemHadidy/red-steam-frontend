import type { Game } from '@entities/game.entity';
import type { ChangeEvent, MouseEvent, RefObject, SetStateAction } from 'react';

export interface Filter {
  id: number;
  name: string;
  check: 'unchecked' | 'included' | 'excluded';
}

export interface FilterState {
  price: Filter[];
  preference: Filter[];
  tag: Filter[];
  os: Filter[];
  publisher: Filter[];
  developer: Filter[];
  feature: Filter[];
  language: Filter[];
}

export interface RequestParams {
  searchData: {
    sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews' | 'totalSales';
    partialName?: string;
    maxPrice?: number;
    tags?: number[];
    excludeTags?: number[];
    paid?: boolean;
    offers?: boolean;
    platforms?: ('win' | 'mac')[];
    publishers?: number[];
    developers?: number[];
    features?: number[];
    languages?: number[];
    featured?: boolean;
    excludeMature?: boolean;
    excludedGames?: number[];
    upcomingMode?: 'onlyUpcoming' | 'exclude';
  };
  pagination: { offset: number; limit: number };
}

export interface SearchLeftProps {
  toggleDropdown: () => void;
  sortOption: string;
  hasMore: boolean;
  setRequestParameters: (requestParameters: SetStateAction<RequestParams>) => void;
  fetchGamesData: (addToEnd?: boolean) => void;
  isOpen: boolean;
  selectOptions: string[];
  selectOption: (option: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  searchValue: string;
  handleSearch: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: MouseEvent<HTMLButtonElement>) => void;
  fetchedGames: Game[];
  disabled: boolean;
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

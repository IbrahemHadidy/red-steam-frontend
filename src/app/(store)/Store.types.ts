import type { Game } from '@interfaces/game';

export interface Category {
  title: string;
  link: string;
  img: string;
  gradRGP: string;
}

export type OpenedTab = 'New & Trending' | 'Top Sellers' | 'Popular Upcoming' | 'Specials';

export interface TabContentProps {
  items: Game[];
  title: string;
  isOpened: boolean;
  seeMore: string;
  onTabHover: (game: number | null) => void;
  setHoveredGame: (game: Game | null) => void;
}

export interface LeftSectionProps {
  openedTab: OpenedTab;
  handleTabClick: (tabTitle: OpenedTab) => void;
  hoveredTabIndex: number | null;
  onTabHover: (index: number | null) => void;
  setHoveredGame: (game: Game | null) => void;
  newAndTrending: Game[];
  specials: Game[];
  topSellers: Game[];
  popularUpcoming: Game[];
}

export interface RightSectionProps {
  game: Game | null;
}

export interface TabProps {
  tabName: string;
  tabTitle: string;
  handleTabClick: (tabTitle: string) => void;
  openedTab: OpenedTab;
}

export interface queueGame {
  imageNumber: string;
  imageLink: string;
}

export interface LinkItem {
  to: string;
  text: string;
}

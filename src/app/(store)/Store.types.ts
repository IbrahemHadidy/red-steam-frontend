import type { Game } from '@entities/game.entity';

export interface Category {
  title: string;
  link: string;
  img: string;
  gradRGP: string;
}

export interface LeftSectionProps {
  openedTab: string | number;
  handleTabClick: (tabTitle: string) => void;
  hoveredTabIndex: number | null;
  onTabHover: (index: number | null) => void;
  setHoveredGame: (game: Game | null) => void;
}

export interface RightSectionProps {
  game: Game | null;
}

export interface TabProps {
  tabName: string;
  tabTitle: string;
  handleTabClick: (tabTitle: string) => void;
  openedTab: string | number;
}

export interface queueGame {
  imageNumber: string;
  imageLink: string;
}

export interface LinkItem {
  to: string;
  text: string;
}

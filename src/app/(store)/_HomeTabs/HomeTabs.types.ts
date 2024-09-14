import type { Game } from '@entities/game.entity';

export interface TabContentProps {
  items: Game[];
  title: string;
  isOpened: boolean;
  seeMore: string;
  onTabHover: (game: number | null) => void;
  setHoveredGame: (game: Game | null) => void;
}

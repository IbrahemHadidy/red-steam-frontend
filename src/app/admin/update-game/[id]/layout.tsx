// Styles
import '@styles/admin/GameAdmin.scss';
import '@styles/game/Game.scss';
import '@styles/game/GameContent.scss';
import '@styles/game/MediaAndSummary.scss';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface GameUpdateLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Update Game - Red Steam',
  description: 'Update a new game on Red Steam',
};

export default function GameUpdateLayout({ children }: GameUpdateLayoutProps): JSX.Element {
  return <div className="game-update">{children}</div>;
}

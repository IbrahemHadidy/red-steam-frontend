// Styles
import '@styles/admin/GameAdmin.scss';
import '@styles/game/game.scss';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface GameCreateLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Game - Red Steam',
  description: 'Create a new game on Red Steam',
};

export default function GameCreateLayout({ children }: GameCreateLayoutProps): JSX.Element {
  return <div className="game-create">{children}</div>;
}

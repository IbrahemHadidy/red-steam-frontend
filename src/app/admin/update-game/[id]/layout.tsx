// Styles
import '@styles/admin/GameAdmin.scss';
import '@styles/game/game.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Update Game - Red Steam',
  description: 'Update a new game on Red Steam',
};

const GameUpdateLayout: FC<Props> = ({ children }): JSX.Element => {
  return <div className="game-update">{children}</div>;
};

export default GameUpdateLayout;

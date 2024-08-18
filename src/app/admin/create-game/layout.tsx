// Styles
import 'styles/admin/GameCreate.scss';
import 'styles/game/game.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Game - Red Steam',
  description: 'Create a new game on Red Steam',
};

const GameCreateLayout: FC<Props> = ({ children }): JSX.Element => {
  return <div className="game-create">{children}</div>;
};

export default GameCreateLayout;

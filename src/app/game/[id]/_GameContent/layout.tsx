'use client';

// Components
import LeftContent from './LeftContent';
import RightContent from './RightContent';

// Styles
import '@styles/game/GameContent.scss';

// Types
import type { JSX } from 'react';
import type { GameContentProps } from './GameContent.types';

export default function GameContent({ game }: GameContentProps): JSX.Element {
  return (
    <div className="page-content game-content">
      <RightContent game={game} />
      <LeftContent game={game} />
    </div>
  );
};

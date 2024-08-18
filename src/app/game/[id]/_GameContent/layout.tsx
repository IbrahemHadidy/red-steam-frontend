'use client';

// Components
import LeftContent from './LeftContent';
import RightContent from './RightContent';

// Styles
import 'styles/game/GameContent.scss';

// Types
import type { FC, JSX } from 'react';
import type { GameContentProps } from './GameContent.types';

const GameContent: FC<GameContentProps> = ({ game }): JSX.Element => {
  return (
    <div className="page-content game-content">
      <RightContent game={game} />
      <LeftContent game={game} />
    </div>
  );
};

export default GameContent;

'use client';

// Components
import LeftContent from './LeftContent';
import RightContent from './RightContent';

// Styles
import './GameContent.scss';

// Types
import type { FC } from 'react';
import type { GameContentProps } from './GameContent.types';

const GameContent: FC<GameContentProps> = ({ game, isViewport630, isViewport960 }) => {
  return (
    <div className="page-content game-content">
      <RightContent game={game} isViewport630={isViewport630} isViewport960={isViewport960} />
      <LeftContent game={game} isViewport630={isViewport630} />
    </div>
  );
};

export default GameContent;

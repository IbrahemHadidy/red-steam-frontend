'use client';

// Next.js
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { FC } from 'react';
import type { GameTitleAreaProps } from './MediaAndSummary.types';

export const GameTitleArea: FC<GameTitleAreaProps> = ({ category, name }) => {
  const handleCommunityBtnClick = () => {
    toast.warn('Community Hub is not available yet');
  };

  return (
    <div className="game-title-area">
      <div className="genre-block">
        <Link href={`/search/`}>
          <span className="genre-item">All Games</span>
        </Link>{' '}
        &gt;{' '}
        <Link href={`/genre/${category}/`}>
          <span className="genre-item">{category}</span>
        </Link>{' '}
        &gt;{' '}
        <Link href={`/game/${name}/`}>
          <span className="genre-item">{name}</span>
        </Link>
      </div>
      <div className="game-header-content">
        <div className="game-community">
          <a className="community-btn" onClick={handleCommunityBtnClick}>
            <span>Community Hub</span>
          </a>
        </div>
        <div className="main-game-name">{name}</div>
      </div>
    </div>
  );
};

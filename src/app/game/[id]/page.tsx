'use client';

// React
import { Suspense } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Components
const GameContent = dynamic(() => import('./_GameContent/layout'));
const GameReviews = dynamic(() => import('./_GameReviews/page'));
const MediaAndSummary = dynamic(() => import('./_MediaAndSummary/MediaAndSummary'));

// Hooks
import useDynamicBackground from 'hooks/useDynamicBackground';
// Services
import gameData from 'services/gameData/gameData';

// Types
import type { FC, JSX } from 'react';
import type { Game } from 'types/game.types';
import type { GameProps } from './Game.types';

const GamePage: FC<GameProps> = ({ params }): JSX.Element | null => {
  const router = useRouter();
  const { id } = params;

  // TODO: Change to a fetch function
  const game: Game | undefined = gameData.find((game) => game.id === Number(id));

  useDynamicBackground(
    `url(${game?.thumbnailEntries.backgroundImage}) center top no-repeat #1b2838`,
    [game?.thumbnailEntries.backgroundImage]
  );

  if (!game) {
    console.error('Game not found');
    router.push('/notfound');
    return null;
  }

  return (
    <>
      <MediaAndSummary game={game} />
      <GameContent game={game} />
      <Suspense fallback={<div>Loading...</div>}>
        <GameReviews game={game} />
      </Suspense>
    </>
  );
};

export default GamePage;

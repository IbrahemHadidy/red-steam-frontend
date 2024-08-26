'use client';

// React
import { Suspense, useEffect, useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Components
import LoadingSkeleton from './Skeleton';
const GameContent = dynamic(() => import('./_GameContent/layout'));
const GameReviews = dynamic(() => import('./_GameReviews/page'));
const MediaAndSummary = dynamic(() => import('./_MediaAndSummary/MediaAndSummary'));

// Custom Hooks
import useDynamicBackground from 'hooks/useDynamicBackground';

// Services
import { getById } from 'services/game/data';

// Types
import type { FC, JSX } from 'react';
import type { Game } from 'types/game.types';
import type { GameProps } from './Game.types';

const GamePage: FC<GameProps> = ({ params }): JSX.Element | null => {
  const router = useRouter();
  const { id } = params;
  const [game, setGame] = useState<Game | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      try {
        const fetchedGame = await getById(Number(id));
        console.log(fetchedGame);
        setGame(fetchedGame);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, router]);

  useDynamicBackground(
    `url(${game?.thumbnailEntries.backgroundImage}) center top no-repeat #1b2838`,
    [game?.thumbnailEntries.backgroundImage]
  );

  if (loading) {
    return <LoadingSkeleton />;
  } else if (game) {
    return (
      <>
        <MediaAndSummary game={game} />
        <GameContent game={game} />
        <Suspense fallback={<div>Loading reviews...</div>}>
          <GameReviews game={game} />
        </Suspense>
      </>
    );
  } else {
    console.error('Error fetching game');
    router.replace('/notfound');
    return null;
  }
};

export default GamePage;

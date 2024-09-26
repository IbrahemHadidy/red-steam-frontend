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
import useDynamicBackground from '@hooks/useDynamicBackground';

// Services
import { getById } from '@services/game/data';

// Types
import type { Game } from '@entities/game.entity';
import type { FC, JSX } from 'react';
import type { GameProps } from './Game.types';

const Game: FC<GameProps> = ({ params }): JSX.Element | null => {
  const router = useRouter();
  const { id } = params;
  const [game, setGame] = useState<Game | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      const gameId = Number(id);
      const recentGames: { id: number; name: string; timestamp: number }[] = JSON.parse(
        localStorage.getItem('recentGames') || '[]'
      );

      const fetchedGame: Game | undefined = !isNaN(gameId) ? await getById(gameId) : undefined;
      if (fetchedGame) {
        setGame(fetchedGame);
        setLoading(false);

        if (!recentGames.some((item) => item.id === fetchedGame.id)) {
          recentGames.push({ id: fetchedGame.id, name: fetchedGame.name, timestamp: Date.now() });
          localStorage.setItem('recentGames', JSON.stringify(recentGames));
        }
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
        <Suspense fallback={<LoadingSkeleton />}>
          <MediaAndSummary game={game} />
          <GameContent game={game} />
        </Suspense>
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

export default Game;

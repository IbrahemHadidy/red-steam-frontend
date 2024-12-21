'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeGame, reset } from '@store/features/game/gameSlice';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Skeletons
import ContentSkeleton from '@app/game/[id]/_GameContent/Skeleton';
import MediaAndSummarySkeleton from '@app/game/[id]/_MediaAndSummary/Skeleton';
import Loader from '@components/Loader';

// Types
import type { ReactNode } from 'react';

interface GameProviderProps {
  id: string;
  children: ReactNode;
}

export default function GameProvider({ id, children }: GameProviderProps) {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentGame, isGameFetching } = useAppSelector((state) => state.game);

  //-----------------------------  On Mount -------------------------------//
  useEffect(() => {
    dispatch(initializeGame(id));
    dispatch(reset());
  }, [dispatch, id]);

  //------------------------------- Render --------------------------------//
  useDynamicBackground(
    `url(${currentGame?.thumbnailEntries.backgroundImage}) center top no-repeat #1b2838`,
    [currentGame?.thumbnailEntries.backgroundImage]
  );

  if (isGameFetching) {
    return (
      <>
        <MediaAndSummarySkeleton />
        <ContentSkeleton />
        <Loader />
      </>
    );
  } else if (currentGame) {
    return <>{children}</>;
  } else {
    console.error('Error fetching game');
    router.replace('/notfound');
    return null;
  }
}

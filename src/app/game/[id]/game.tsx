'use client';

// React
import { useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Components
import RenderOnViewportEntry from '@components/RenderOnViewportEntry';
const MediaAndSummary = dynamic(() => import('./_MediaAndSummary/MediaAndSummary'), {
  loading: () => <MediaAndSummarySkeleton />,
});
const GameContent = dynamic(() => import('./_GameContent/GameContent'), {
  loading: () => <ContentSkeleton />,
});
const GameReviews = dynamic(() => import('./_GameReviews/GameReviews'), {
  loading: () => <Loader />,
});

// Skeletons
import Loader from '@components/Loader';
import ContentSkeleton from './_GameContent/Skeleton';
import MediaAndSummarySkeleton from './_MediaAndSummary/Skeleton';

export default function Game() {
  const [gameContentLoaded, setGameContentLoaded] = useState<boolean>(false);

  return (
    <>
      <MediaAndSummary />

      <RenderOnViewportEntry
        loader={<ContentSkeleton />}
        onLoadComplete={() => setGameContentLoaded(true)}
      >
        <GameContent />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry loader={<Loader />} shouldLoad={gameContentLoaded}>
        <GameReviews />
      </RenderOnViewportEntry>
    </>
  );
}

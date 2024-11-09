// NextJS
import dynamic from 'next/dynamic';

// Redux
import makeStore from '@store/store';

// APIs
import gameDataApi from '@store/apis/game/data';

// Providers
import GameProvider from '@providers/GameProvider';

// Skeletons
import Loader from '@components/Loader';
import ContentSkeleton from './_GameContent/Skeleton';
import MediaAndSummarySkeleton from './_MediaAndSummary/Skeleton';

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

// Images
import pwaIcon from '@images/pwa-icon.png';

// Types
import type { Game } from '@interfaces/game';
import type { Metadata } from 'next';

interface GamePageProps {
  params: Promise<{ id: string }>;
}

// Create a new store instance
const store = makeStore();
const dispatch = store.dispatch;

export async function generateMetadata(props: GamePageProps): Promise<Metadata> {
  //--------------------------- Initializations ---------------------------//
  const params = await props.params;
  const { id } = params;

  try {
    const gameId = Number(id);
    const game: Game | undefined = !isNaN(gameId)
      ? await dispatch(gameDataApi.endpoints.getById.initiate(gameId)).unwrap()
      : undefined;

    const discountPercentage = game?.pricing?.discountPercentage?.toString() || '';

    return {
      title: `${
        game?.pricing?.discount && discountPercentage
          ? `Save ${discountPercentage.replace(/^-(\d+)/, '$1')}% on`
          : ''
      } ${game?.name} on Steam`,
      description: game?.description,
      openGraph: {
        title: `${
          game?.pricing?.discount && discountPercentage
            ? `Save ${discountPercentage.replace(/^-(\d+)/, '$1')}% on`
            : ''
        } ${game?.name} on Steam`,
        description: game?.description,
        images: [
          {
            url: game?.thumbnailEntries.mainImage || pwaIcon.src,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log('Error fetching game metadata:', error);
    return {
      title: 'Game not found',
      description: 'Game not found',
    };
  }
}

export default async function GamePage(props: GamePageProps) {
  const { id } = await props.params;

  return (
    <GameProvider id={id}>
      <MediaAndSummary />

      <RenderOnViewportEntry loader={<ContentSkeleton />}>
        <GameContent />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry loader={<Loader />}>
        <GameReviews />
      </RenderOnViewportEntry>
    </GameProvider>
  );
}

// Redux
import makeStore from '@store/store';

// APIs
import gameDataApi from '@store/apis/game/data';

// Providers
import GameProvider from '@providers/GameProvider';

// Images
import pwaIcon from '@images/pwa-icon.png';

// Components
import Game from './game';

// Types
import type { Game as GameType } from '@interfaces/game';
import type { Metadata } from 'next';

interface GamePageProps {
  params: Promise<{ id: string }>;
}

// Create a new store instance
const store = makeStore();
const dispatch = store.dispatch;

export async function generateMetadata(props: GamePageProps): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  try {
    const gameId = Number(id);
    const game: GameType | undefined = !isNaN(gameId)
      ? await dispatch(gameDataApi.endpoints.getById.initiate(gameId)).unwrap()
      : undefined;

    const discountPercentage = game?.pricing?.discountPercentage?.toString() ?? '';

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
            url: game?.thumbnailEntries.mainImage ?? pwaIcon.src,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
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
      <Game />
    </GameProvider>
  );
}

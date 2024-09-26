// Components
import Game from './game';

// Services
import { getById } from '@services/game/data';

// Images
import pwaIcon from '@images/pwa-icon.png';

// Types
import type { Metadata } from 'next';
import type { FC, JSX } from 'react';
import type { GameProps } from './Game.types';

export const generateMetadata = async ({ params }: GameProps): Promise<Metadata> => {
  const { id } = params;

  try {
    const gameId = Number(id);
    const game: Game | undefined = !isNaN(gameId) ? await getById(gameId) : undefined;

    const discountPercentage: string = game?.pricing?.discountPercentage?.toString() || '';

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
};

const GamePage: FC<GameProps> = ({ params }): JSX.Element | null => <Game params={params} />;

export default GamePage;

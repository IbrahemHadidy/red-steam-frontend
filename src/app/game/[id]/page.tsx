// Components
import Game from './game';

// Services
import { getById } from '@services/game/data';

// Images
import pwaIcon from '@images/pwa-icon.png';

// Types
import type { Game as GameType } from '@interfaces/game';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import type { GameProps } from './Game.types';

export async function generateMetadata(props: GameProps): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  try {
    const gameId = Number(id);
    const game: GameType | undefined = !isNaN(gameId) ? await getById(gameId) : undefined;

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
}

export default async function GamePage(props: GameProps): Promise<JSX.Element | null> {
  const params = await props.params;
  return <Game params={params} />;
}

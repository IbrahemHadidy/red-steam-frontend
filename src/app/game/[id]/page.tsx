'use client';

import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import { useRouter } from 'next/navigation';
import GameContent from 'pages/Game/GameContent/GameContent';
import GameReviews from 'pages/Game/GameReviews/GameReviews';
import MediaAndSummary from 'pages/Game/MediaAndSummary/MediaAndSummary';
import gameData from 'services/gameData/gameData';

import './game.scss';

type params = {
  id: string;
};

export default function GamePage({ params }: { params: params }) {
  const router = useRouter();
  const isViewport960 = useResponsiveViewport(960);
  const isViewport630 = useResponsiveViewport(630);

  const { id } = params;

  // TODO: Change to a fetch function
  const game = gameData.find((game) => game.id === Number(id));

  useDynamicMetaTags(
    {
      title: `${
        !game?.discount && game?.discountPercentage
          ? `Save ${game?.discountPercentage.replace(/^-(\d+)/, '$1')} on`
          : ''
      } ${game?.name} on Steam`,
      background: `url(${game?.backgroundImage}) center top no-repeat #1b2838`,
      description: game?.description,
      imageSrc: game?.mainImage,
    },
    [game?.backgroundImage, game?.description, game?.discount, game?.discountPercentage, game?.name]
  );

  if (!game) {
    console.error('Game not found');
    return router.push('/notfound');
  }

  return (
    <div className="game">
      <MediaAndSummary game={game} isViewport630={isViewport630} isViewport960={isViewport960} />
      <GameContent game={game} isViewport630={isViewport630} isViewport960={isViewport960} />
      <GameReviews game={game} isViewport630={isViewport630} isViewport960={isViewport960} />
    </div>
  );
}

// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import HoverSummary from '@components/HoverSummary/HoverSummary';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';

// Types
import type { Game } from '@interfaces/game';

interface ItemProps {
  game: Game;
}
export default function Item({ game }: ItemProps) {
  //--------------------------- Initializations ---------------------------//
  const isViewport960 = useResponsiveViewport(960);

  //----------------------------- State Hooks -----------------------------//
  const [gameHoverStates, setGameHoverStates] = useState<{
    [key: string]: boolean;
  }>({});

  //---------------------------- Event Handlers ---------------------------//
  const handleMiniItemPointerMove = (id: number): void => {
    setGameHoverStates((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleMiniItemPointerLeave = (id: number): void => {
    setGameHoverStates((prevState) => ({ ...prevState, [id]: false }));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="mini-item-container" key={game.id}>
      <Link
        className="mini-item"
        href={`/game/${game.id}`}
        onMouseEnter={() => handleMiniItemPointerMove(game.id)}
        onMouseLeave={() => handleMiniItemPointerLeave(game.id)}
      >
        <div className="mini-capsule">
          <img src={game.thumbnailEntries.smallHeaderImage} alt={game.name} />
        </div>

        <div className="mini-price">
          <div className={game.pricing?.discount ? 'discount' : 'no-discount'}>
            <div className="price">
              {!game.pricing?.discount ? (
                game.pricing?.free ? (
                  'Free to Play'
                ) : (
                  `$${game.pricing?.basePrice}`
                )
              ) : (
                <div className="mini-discount-block">
                  <div className="discount-percentage"> -{game.pricing.discountPercentage}%</div>

                  <div className="discount-prices">
                    <div className="original-price">${game.pricing.basePrice}</div>
                    <div className="final-price">${game.pricing.discountPrice}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      {!isViewport960 && gameHoverStates[game.id] && (
        <div>
          <HoverSummary
            title={game.name}
            date={formatDate(game.releaseDate)}
            screenshots={game.imageEntries.filter((img) => img.featured).map((img) => img.link)}
            description={game.description}
            positivePercentage={game.averageRating}
            totalReviews={game.reviewsCount}
            tags={game.tags?.map((item) => item.name) || []}
            leftArrow={!isViewport960}
            rightArrow={!isViewport960}
          />
        </div>
      )}
    </div>
  );
}

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
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- States --------------------------------//
  const [isGameHovered, setIsGameHovered] = useState<boolean>(false);

  //---------------------------- Event Handlers ---------------------------//
  const handleMiniItemPointerMove = (): void => {
    setIsGameHovered(true);
  };

  const handleMiniItemPointerLeave = (): void => {
    setIsGameHovered(false);
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="mini-item-container">
      <Link
        className="mini-item"
        href={`/game/${game.id}`}
        onMouseEnter={handleMiniItemPointerMove}
        onMouseLeave={handleMiniItemPointerLeave}
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

      {!isViewport960OrLess && (
        <HoverSummary
          title={game.name}
          date={formatDate(game.releaseDate)}
          screenshots={game.imageEntries.filter((img) => img.featured).map((img) => img.link)}
          description={game.description}
          positivePercentage={game.averageRating}
          totalReviews={game.reviewsCount}
          tags={game.tags?.map((item) => item.name) ?? []}
          leftArrow={!isViewport960OrLess}
          rightArrow={!isViewport960OrLess}
          isVisible={isGameHovered}
        />
      )}
    </div>
  );
}

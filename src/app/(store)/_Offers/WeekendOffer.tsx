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

interface WeekendOfferProps {
  offer: Game;
}

export default function WeekendOffer({ offer }: WeekendOfferProps) {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- States --------------------------------//
  const [isOfferHovered, setIsOfferHovered] = useState<boolean>(false);

  //--------------------------- Event Handlers ----------------------------//
  const handleOfferMouseEnter = (): void => {
    setIsOfferHovered(true);
  };

  const handleOfferMouseLeave = (): void => {
    setIsOfferHovered(false);
  };

  //------------------------------- Render --------------------------------//
  return (
    <div
      className="offer-result-container big"
      onMouseEnter={handleOfferMouseEnter}
      onMouseLeave={handleOfferMouseLeave}
    >
      <Link href={`/game/${offer.id}`} className="offer-bg">
        <div className="spotlight-img">
          <img
            src={offer.thumbnailEntries.verticalHeaderImage ?? '/spotlight_background.jpg'}
            alt={offer.name}
          />
        </div>
        <div className="spotlight-content">
          <h2>{offer.pricing?.offerType}</h2>

          <div className="spotlight-body">
            Offer ends {formatDate(offer.pricing?.discountEndDate)}
          </div>

          <div className="spotlight-body spotlight-price price">
            <div className="discount-block-offers">
              <div className="discount-Percentage-offers">
                -{offer.pricing?.discountPercentage}%
              </div>

              <div className="discount-prices-offers">
                <div className="original-price-offers">${offer.pricing?.basePrice}</div>
                <div className="final-price-offers">${offer.pricing?.discountPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {!isViewport960OrLess && (
        <HoverSummary
          title={offer.name}
          date={formatDate(offer.releaseDate)}
          screenshots={offer.imageEntries.filter((img) => img.featured).map((img) => img.link)}
          description={offer.description}
          positivePercentage={offer.averageRating}
          totalReviews={offer.reviewsCount}
          tags={offer.tags?.map((tag) => tag.name) ?? []}
          leftArrow={!isViewport960OrLess}
          rightArrow={!isViewport960OrLess}
          isVisible={isOfferHovered}
        />
      )}
    </div>
  );
}

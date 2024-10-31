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

interface SpecialOfferProps {
  offer: Game;
}

export default function SpecialOffer({ offer }: SpecialOfferProps) {
  //--------------------------- Initializations ---------------------------//
  const isViewport960 = useResponsiveViewport(960);

  //----------------------------- State Hooks -----------------------------//
  const [offerHoverStates, setOfferHoverStates] = useState<{ [key: string]: boolean }>({});

  //--------------------------- Event Handlers ----------------------------//
  const handleOfferPointerMove = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: true }));
  };

  const handleOfferPointerLeave = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: false }));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="offer-result-container small" key={`special-${offer.id}`}>
      <div
        className="specials"
        onMouseEnter={() => handleOfferPointerMove(offer.id)}
        onMouseLeave={() => handleOfferPointerLeave(offer.id)}
      >
        <Link className="special-capsule" href={`/game/${offer.id}`}>
          <div className="header-capsule">
            <img src={offer.thumbnailEntries.horizontalHeaderImage} alt={offer.name} />
          </div>

          <div>
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
        </Link>
      </div>
      {!isViewport960 && offerHoverStates[offer.id] && (
        <div>
          <HoverSummary
            title={offer.name}
            date={formatDate(offer.releaseDate)}
            screenshots={offer.imageEntries.filter((img) => img.featured).map((img) => img.link)}
            description={offer.description}
            positivePercentage={offer.averageRating}
            totalReviews={offer.reviewsCount}
            tags={offer.tags?.map((tag) => tag.name) || []}
            leftArrow={!isViewport960}
            rightArrow={!isViewport960}
          />
        </div>
      )}
    </div>
  );
}

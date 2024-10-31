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
  const isViewport960 = useResponsiveViewport(960);

  //----------------------------- State Hooks -----------------------------//
  const [offerHoverStates, setOfferHoverStates] = useState<{ [key: string]: boolean }>({});

  //---------------------------- Event Handlers ----------------------------//
  const handleOfferPointerMove = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: true }));
  };

  const handleOfferPointerLeave = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: false }));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div
      className="offer-result-container big"
      key={`offer-${offer.id}`}
      onMouseEnter={() => handleOfferPointerMove(offer.id)}
      onMouseLeave={() => handleOfferPointerLeave(offer.id)}
    >
      <Link href={`/game/${offer.id}`} className="offer-bg">
        <div className="spotlight-img">
          <img
            src={offer.thumbnailEntries.verticalHeaderImage || '/spotlight_background.jpg'}
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

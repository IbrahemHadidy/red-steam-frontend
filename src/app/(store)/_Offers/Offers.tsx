'use client';

// React
import { Fragment, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';
import Slider from 'react-slick';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Utils
import formatDate from 'utils/formatDate';

// Services
import { offeredGames, specialOffers } from 'services/gameData/OfferedGames';

// Images
import responsiveChevron from 'images/ResponsiveChevron.svg';

// Types
import type { FC, JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';
import type { Game } from 'types/game.types';

const Offers: FC = (): JSX.Element => {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [offerHoverStates, setOfferHoverStates] = useState<{ [key: string]: boolean }>({});

  const offersSettings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  const handleOfferPointerMove = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: true }));
  };

  const handleOfferPointerLeave = (offerId: number): void => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: false }));
  };

  const BigOfferDiv = (offer: Game, idx: number): JSX.Element => {
    const positiveCount = offer.reviews.filter((review) => review.positive).length;
    const totalReviews = offer.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;

    return (
      <div
        className="offer-result-container big"
        key={`offer-${idx}`}
        onPointerMove={() => handleOfferPointerMove(offer.id)}
        onPointerLeave={() => handleOfferPointerLeave(offer.id)}
      >
        <Link href={`/game/${offer.id}`} className="offer-bg">
          <div className="spotlight-img">
            <img
              src={offer.thumbnailEntries.verticalHeaderImage || '/spotlight_background.jpg'}
              alt={offer.name}
            />
          </div>
          <div className="spotlight-content">
            <h2>{offer.pricing.offerType}</h2>
            <div className="spotlight-body">
              Offer ends {formatDate(offer.pricing.discountEndDate)}
            </div>
            <div className="spotlight-body spotlight-price price">
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">
                  -{offer.pricing.discountPercentage}%
                </div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.pricing.price}</div>
                  <div className="final-price-offers">${offer.pricing.discountPrice}</div>
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
              screenshots={offer.imageEntries.map((item) => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags.map((tag) => tag.name)}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSmallGroupDiv = (offer: Game, idx: number): JSX.Element => {
    const positiveCount = offer.reviews.filter((review) => review.positive).length;
    const totalReviews = offer.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;

    return (
      <div className="offer-result-container small" key={`special-${idx}`}>
        <div
          className="specials"
          onPointerMove={() => handleOfferPointerMove(offer.id)}
          onPointerLeave={() => handleOfferPointerLeave(offer.id)}
        >
          <Link className="special-capsule" href={`/game/${offer.id}`}>
            <div className="header-capsule">
              <img src={offer.thumbnailEntries.horizontalHeaderImage} alt={offer.name} />
            </div>
            <div>
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">
                  -{offer.pricing.discountPercentage}%
                </div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.pricing.basePrice}</div>
                  <div className="final-price-offers">${offer.pricing.discountPrice}</div>
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
              screenshots={offer.imageEntries.map((item) => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags.map((tag) => tag.name)}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSmallGroups = (specialOffers: Game[]): JSX.Element[] => {
    const smallGroups: JSX.Element[] = [];
    for (let i = 0; i < specialOffers.length; i += 2) {
      const smallGroup: JSX.Element = (
        <div className="small-group" key={`small-group-${i}`}>
          {renderSmallGroupDiv(specialOffers[i], i)}
          {specialOffers[i + 1] && renderSmallGroupDiv(specialOffers[i + 1], i + 1)}
        </div>
      );
      smallGroups.push(smallGroup);
    }
    return smallGroups;
  };

  const renderSlides = (): JSX.Element[] => {
    const SLOTS_PER_SLIDE: number = 6;
    const BIG_OFFER_SLOTS: number = 2; // 2 slots for each big offer
    const SMALL_GROUP_SLOTS: number = 2; // 2 slots for each small group

    const slides: JSX.Element[] = [];
    let currentSlide: JSX.Element[] = [];
    let currentSlots: number = 0;

    const addOfferToSlide = (offer: JSX.Element, slots: number): void => {
      if (currentSlots + slots <= SLOTS_PER_SLIDE) {
        currentSlide.push(offer);
        currentSlots += slots;
      } else {
        if (currentSlots === SLOTS_PER_SLIDE) {
          slides.push(<div className="offers-row">{currentSlide}</div>);
        }
        currentSlide = [offer];
        currentSlots = slots;
      }
    };

    // Process big offers
    let bigOfferCount: number = 0;
    offeredGames.forEach((offer, idx): void => {
      const bigOffer = BigOfferDiv(offer, idx);
      if (bigOfferCount < 2) {
        addOfferToSlide(bigOffer, BIG_OFFER_SLOTS);
        bigOfferCount += 1;
      }
      if (bigOfferCount === 2) {
        bigOfferCount = 0; // Reset after adding 2 big offers
        // After 2 big offers, add 1 small group if available
        const smallGroups: JSX.Element[] = renderSmallGroups(specialOffers);
        if (smallGroups.length > 0) {
          const smallGroup: JSX.Element | undefined = smallGroups.shift(); // Get the first small group
          if (smallGroup) {
            addOfferToSlide(smallGroup, SMALL_GROUP_SLOTS);
          }
        }
      }
    });

    // Add remaining small groups if any
    const remainingSmallGroups: JSX.Element[] = renderSmallGroups(specialOffers);
    remainingSmallGroups.forEach((smallGroup) => {
      addOfferToSlide(smallGroup, SMALL_GROUP_SLOTS);
    });

    // Push the last slide if it is full
    if (currentSlots === SLOTS_PER_SLIDE) {
      slides.push(<div className="offers-row">{currentSlide}</div>);
    }

    // Limit the number of slides to 6
    return slides.slice(0, 6);
  };

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          Special Offers
          <span className="right-btn">
            <Link className="view-more" href="/search?priceOptions=Special%20Offers">
              {isViewport960 ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{' '}
                    <img src={responsiveChevron.src} className="dive" alt="ResponsiveChevron" />
                  </div>
                </div>
              ) : (
                <span>Browse More</span>
              )}
            </Link>
          </span>
        </h2>
        <div className="offers-slides">
          <div className="offers-items">
            {isViewport960 ? (
              <div className="mobile-offers">
                {renderSlides().map((slide, idx) => (
                  <Fragment key={idx}>{slide}</Fragment>
                ))}
              </div>
            ) : (
              <Slider {...offersSettings}>
                {renderSlides().map((slide, idx) => (
                  <div className="offers-row" key={idx}>
                    {slide}
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;

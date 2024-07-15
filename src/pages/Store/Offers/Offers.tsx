'use client';

// React
import { useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';
import Slider from 'react-slick';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import { offeredGames, specialOffers } from 'services/gameData/OfferedGames';

// Images
import responsiveChevron from 'images/ResponsiveChevron.svg';

// Styles
import './Offers.scss';

// Types
import type { FC, JSX } from 'react';
import type { gamesData } from 'services/gameData/gameData';

const Offers: FC = () => {
  // Initializations
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [offerHoverStates, setOfferHoverStates] = useState<{ [key: string]: boolean }>({});

  const offersSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  const handleOfferPointerMove = (offerId: number) => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: true }));
  };

  const handleOfferPointerLeave = (offerId: number) => {
    setOfferHoverStates((prevState) => ({ ...prevState, [offerId]: false }));
  };

  const BigOfferDiv = (offer: gamesData, index: number) => {
    const positiveCount = offer.reviews.filter((review) => review.type === 'positive').length;
    const totalReviews = offer.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;

    return (
      <div
        className="offer-result-container big"
        key={`offer-${index}`}
        onPointerMove={() => handleOfferPointerMove(offer.id)}
        onPointerLeave={() => handleOfferPointerLeave(offer.id)}
      >
        <Link href={`/game/${offer.id}`} className="offer-bg">
          <div className="spotlight-img">
            <img src={offer.verticalHeaderImage || '/spotlight_background.jpg'} alt={offer.name} />
          </div>
          <div className="spotlight-content">
            <h2>{offer.offerType}</h2>
            <div className="spotlight-body">Offer ends {offer.offerEndDate}</div>
            <div className="spotlight-body spotlight-price price">
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">-{offer.discountPercentage}%</div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.price}</div>
                  <div className="final-price-offers">${offer.discountPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {!isViewport960 && offerHoverStates[offer.id] && (
          <div>
            <HoverSummary
              title={offer.name}
              date={offer.releaseDate}
              screenshots={offer.moviesAndImages
                .filter((item) => item.type === 'image' && item.featured)
                .map((item) => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSmallGroupDiv = (offer: gamesData, index: number) => {
    const positiveCount = offer.reviews.filter((review) => review.type === 'positive').length;
    const totalReviews = offer.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;

    return (
      <div className="offer-result-container small" key={`special-${index}`}>
        <div
          className="specials"
          onPointerMove={() => handleOfferPointerMove(offer.id)}
          onPointerLeave={() => handleOfferPointerLeave(offer.id)}
        >
          <Link className="special-capsule" href={`/game/${offer.id}`}>
            <div className="header-capsule">
              <img src={offer.horizontalHeaderImage} alt={offer.name} />
            </div>
            <div>
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">-{offer.discountPercentage}%</div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.price}</div>
                  <div className="final-price-offers">${offer.discountPrice}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {!isViewport960 && offerHoverStates[offer.id] && (
          <div>
            <HoverSummary
              title={offer.name}
              date={offer.releaseDate}
              screenshots={offer.moviesAndImages
                .filter((item) => item.type === 'image' && item.featured)
                .map((item) => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSmallGroups = (specialOffers: gamesData[]) => {
    const smallGroups: JSX.Element[] = [];
    for (let i = 0; i < specialOffers.length; i += 2) {
      const smallGroup = (
        <div className="small-group" key={`small-group-${i}`}>
          {renderSmallGroupDiv(specialOffers[i], i)}
          {specialOffers[i + 1] && renderSmallGroupDiv(specialOffers[i + 1], i + 1)}
        </div>
      );
      smallGroups.push(smallGroup);
    }
    return smallGroups;
  };

  const renderSlides = () => {
    const SLOTS_PER_SLIDE = 6;
    const BIG_OFFER_SLOTS = 2; // 2 slots for each big offer
    const SMALL_GROUP_SLOTS = 2; // 2 slots for each small group

    const slides: JSX.Element[] = [];
    let currentSlide: JSX.Element[] = [];
    let currentSlots = 0;

    const addOfferToSlide = (offer: JSX.Element, slots: number) => {
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
    let bigOfferCount = 0;
    offeredGames.forEach((offer, index) => {
      const bigOffer = BigOfferDiv(offer, index);
      if (bigOfferCount < 2) {
        addOfferToSlide(bigOffer, BIG_OFFER_SLOTS);
        bigOfferCount += 1;
      }
      if (bigOfferCount === 2) {
        bigOfferCount = 0; // Reset after adding 2 big offers
        // After 2 big offers, add 1 small group if available
        const smallGroups = renderSmallGroups(specialOffers);
        if (smallGroups.length > 0) {
          const smallGroup = smallGroups.shift(); // Get the first small group
          if (smallGroup) {
            addOfferToSlide(smallGroup, SMALL_GROUP_SLOTS);
          }
        }
      }
    });

    // Add remaining small groups if any
    const remainingSmallGroups = renderSmallGroups(specialOffers);
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
                    More <Image src={responsiveChevron} className="dive" alt="ResponsiveChevron" />
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
              <div className="mobile-offers">{renderSlides()}</div>
            ) : (
              <Slider {...offersSettings}>
                {renderSlides().map((slide, index) => (
                  <div className="offers-row" key={index}>
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

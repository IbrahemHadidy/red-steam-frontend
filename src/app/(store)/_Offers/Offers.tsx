'use client';

// React
import { Fragment, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import Slider from 'react-slick';
import SpecialOffer from './SpecialOffer';
import WeekendOffer from './WeekendOffer';

// Skeletons
import LoadingSkeleton from './Skeleton';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import { useGetByOffersQuery } from '@store/apis/game/data';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Images
import responsiveChevron from '@images/ResponsiveChevron.svg';

// Types
import type { Game } from '@entities/game.entity';
import type { JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';

export default function Offers() {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [weekendOffers, setWeekendOffers] = useState<Game[]>([]);
  const [specialOffers, setSpecialOffers] = useState<Game[]>([]);
  const [totalSlides, setTotalSlides] = useState(0);

  // Queries
  const { data: offersData, isLoading } = useGetByOffersQuery(
    (currentUserData && currentUserData.library.map((game) => game.id)) ?? []
  );

  // Set offers after fetching
  useEffect(() => {
    (async () => {
      offersData?.forEach((game) => {
        if (game.pricing?.offerType === 'SPECIAL PROMOTION') {
          setSpecialOffers((prev) => [...prev, game]);
        }
        if (game.pricing?.offerType === 'WEEKEND DEAL') {
          setWeekendOffers((prev) => [...prev, game]);
        }
      });
    })();
  }, [offersData]);

  // Slider Settings
  const offersSettings: SliderSettings = {
    dots: totalSlides > 1,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
    arrows: totalSlides > 1,
  };

  // Helper/Util functions
  const renderSmallGroups = (specialOffers: Game[]): JSX.Element[] => {
    const smallGroups: JSX.Element[] = [];
    for (let i = 0; i < specialOffers.length; i += 2) {
      const smallGroup: JSX.Element = (
        <div className="small-group" key={`small-group-${i}`}>
          {<SpecialOffer offer={specialOffers[i]} key={specialOffers[i].id} />}
          {specialOffers[i + 1] && (
            <SpecialOffer offer={specialOffers[i + 1]} key={specialOffers[i + 1].id} />
          )}
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
    weekendOffers.forEach((offer): void => {
      const bigOffer = <WeekendOffer offer={offer} key={offer.id} />;

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

    // Set the total number of slides
    if (totalSlides !== slides.length) {
      setTotalSlides(slides.length);
    }

    // Limit the number of slides to 6
    return slides.slice(0, 6);
  };

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
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
}

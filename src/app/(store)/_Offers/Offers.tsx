'use client';

// React
import { Fragment, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// Components
import Slider from 'react-slick';

// Skeletons
import LoadingSkeleton from './Skeleton';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import { useGetByOffersQuery } from '@store/apis/game/data';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import { renderSlides } from './offers-utils';

// Images
import responsiveChevron from '@images/ResponsiveChevron.svg';

// Types
import type { Game } from '@interfaces/game';
import type { Settings as SliderSettings } from 'react-slick';

export default function Offers() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960 = useResponsiveViewport(960);

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [weekendOffers, setWeekendOffers] = useState<Game[]>([]);
  const [specialOffers, setSpecialOffers] = useState<Game[]>([]);
  const [totalSlides, setTotalSlides] = useState(0);

  //----------------------------- Redux Queries ----------------------------//
  const { data: offersData, isLoading } = useGetByOffersQuery(
    (currentUserData && currentUserData.library.map((game) => game.id)) ?? []
  );

  //----------------------------- Slider Config ----------------------------//
  const offersSettings: SliderSettings = {
    dots: totalSlides > 1,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
    arrows: totalSlides > 1,
  };

  //------------------------------- Effects -------------------------------//
  // Set Special and Weekend Offers after fetching
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

  //-------------------------- Render UI Section --------------------------//
  const renderedSlides = renderSlides(weekendOffers, specialOffers, totalSlides, setTotalSlides);

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
                {renderedSlides.map((slide, idx) => (
                  <Fragment key={idx}>{slide}</Fragment>
                ))}
              </div>
            ) : (
              <Slider {...offersSettings}>
                {renderedSlides.map((slide, idx) => (
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

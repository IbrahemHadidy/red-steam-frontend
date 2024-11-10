// React
import { Fragment, useState } from 'react';

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
import type { Settings as SliderSettings } from 'react-slick';
import { useFilteredOffers } from './hooks/useFilteredOffers';

export default function Offers() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960 = useResponsiveViewport(960);

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [totalSlides, setTotalSlides] = useState(0);

  //----------------------------- Redux Queries ----------------------------//
  const { data: offersData, isLoading } = useGetByOffersQuery(
    (currentUserData && currentUserData.library.map((game) => game.id)) ?? []
  );

  //--------------------------------- Hooks --------------------------------//
  const { specialOffers, weekendOffers } = useFilteredOffers(offersData);

  //----------------------------- Slider Config ----------------------------//
  const offersSettings: SliderSettings = {
    dots: totalSlides > 1,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
    arrows: totalSlides > 1,
  };

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
          {renderedSlides.length === 0 ? (
            <div className="no-offers">
              <h3 className="no-offers-text">
                No Offers Available at the moment, check back later.
              </h3>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

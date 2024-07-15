'use client';

// React
import { FC, useState } from 'react';

// Next.js
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';
import Slider from 'react-slick';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import featuredGames from 'services/gameData/featuredGames';

// Types
import type { Settings } from 'react-slick';
import type { gamesData, MediaEntry } from 'services/gameData/gameData';

const FeaturedDesktop: FC = () => {
  // Initializations
  const isViewport1600 = useResponsiveViewport(1600);

  // States
  const [summaryHoverStates, setSummaryHoverStates] = useState<{ [key: string]: boolean }>({});
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleMouseEnterImage = (img: MediaEntry) => {
    setHoveredImage(img.link);
  };

  const handleMouseLeaveImage = () => {
    setHoveredImage(null);
  };

  const handleMouseEnterSlide = (slide: gamesData) => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: true,
    }));
  };

  const handleMouseLeaveSlide = (slide: gamesData) => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: false,
    }));
  };

  const featuredSettings: Settings = {
    dots: true,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="featured-carousel">
      <div className="main-carousel-content">
        <h2 className="home-titles">Featured & Recommended</h2>
        <Slider {...featuredSettings}>
          {featuredGames.map((slide, index) => {
            const positiveCount = slide.reviews.filter(
              (review) => review.type === 'positive'
            ).length;
            const totalReviews = slide.reviews.length;
            const positivePercentage = (positiveCount / totalReviews) * 100;

            return (
              <div className="slides-container" key={index}>
                <Link
                  className="slide"
                  href={`/game/${slide.id}`}
                  onPointerMove={() => handleMouseEnterSlide(slide)}
                  onPointerLeave={() => handleMouseLeaveSlide(slide)}
                >
                  <div
                    className="main-card"
                    style={{
                      backgroundImage: `url(${hoveredImage || slide.mainImage})`,
                      transition: 'background-image 0.1s',
                    }}
                  />
                  <div className="info-card">
                    <div className="app-name">
                      <div>{slide.name}</div>
                    </div>
                    <div className="photos">
                      {slide.moviesAndImages
                        .filter((item) => item.type === 'image' && item.featured)
                        .map((img, index) => (
                          <div key={index}>
                            <div
                              onPointerMove={() => handleMouseEnterImage(img)}
                              onPointerLeave={handleMouseLeaveImage}
                              style={{ backgroundImage: `url(${img.link})` }}
                            />
                          </div>
                        ))}
                    </div>
                    <div className="reason">
                      <div className={slide.reason}>
                        {slide.reason === 'available' ? (
                          <div>Now Available</div>
                        ) : (
                          <>
                            <strong>Recommended</strong> because you liked games tagged with
                          </>
                        )}
                      </div>
                      <div className="tags">
                        {slide.tags.map((tag, index) => (
                          <span key={index}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {!slide.discount ? (
                      <div className="no-discount">
                        <div className="price">
                          {!slide.free && '$'}
                          {slide.price} {!slide.free && 'USD'}
                        </div>
                      </div>
                    ) : (
                      <div className="discount">
                        <div className="discount-block">
                          <div className="discount-percentage">-{slide.discountPercentage}%</div>
                          <div className="discount-prices">
                            <div className="original-price">${slide.price}</div>
                            <div className="final-price">${slide.discountPrice} USD</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="platform">
                      {slide.win && <span className="platform-image win" />}
                      {slide.mac && <span className="platform-image mac" />}
                    </div>
                  </div>
                </Link>
                {!isViewport1600 && summaryHoverStates[slide.id] && (
                  <div>
                    <HoverSummary
                      title={slide.name}
                      date={slide.releaseDate}
                      screenshots={slide.moviesAndImages
                        .filter((item) => item.type === 'image' && item.featured)
                        .map((item) => item.link)}
                      description={slide.description}
                      positivePercentage={positivePercentage}
                      totalReviews={totalReviews}
                      tags={slide.tags}
                      leftArrow={!isViewport1600}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedDesktop;

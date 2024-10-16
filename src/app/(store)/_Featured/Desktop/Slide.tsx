// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import HoverSummary from '@components/HoverSummary/HoverSummary';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import formatDate from '@utils/formatDate';
import getRecommendationClass from '../featured-utils';

// Types
import type { Game, ImageEntry } from '@entities/game.entity';

interface FeaturedDesktopProps {
  slide: Game;
}

export default function Slide({ slide }: FeaturedDesktopProps) {
  // Init
  const isViewport1600 = useResponsiveViewport(1600);

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [summaryHoverStates, setSummaryHoverStates] = useState<{ [key: string]: boolean }>({});
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Event Handlers
  const handleMouseEnterImage = (img: ImageEntry): void => {
    setHoveredImage(img.link);
  };

  const handleMouseLeaveImage = (): void => {
    setHoveredImage(null);
  };

  const handleMouseEnterSlide = (slide: Game): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: true,
    }));
  };

  const handleMouseLeaveSlide = (slide: Game): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: false,
    }));
  };

  return (
    <>
      <Link
        className="slide"
        href={`/game/${slide.id}`}
        onMouseEnter={() => handleMouseEnterSlide(slide)}
        onMouseLeave={() => handleMouseLeaveSlide(slide)}
      >
        <div
          className="main-card"
          style={{
            backgroundImage: `url(${hoveredImage || slide.thumbnailEntries.mainImage})`,
            transition: 'background-image 0.1s',
          }}
        />

        <div className="info-card">
          <div className="app-name">
            <div>{slide.name}</div>
          </div>

          <div className="photos">
            {slide.imageEntries
              .filter((img) => img.featured)
              .map((img, idx) => (
                <div key={idx}>
                  <div
                    onMouseEnter={() => handleMouseEnterImage(img)}
                    onMouseLeave={handleMouseLeaveImage}
                    style={{ backgroundImage: `url(${img.link})` }}
                  />
                </div>
              ))}
          </div>

          <div className="reason">
            <div className={getRecommendationClass(slide)}>
              {getRecommendationClass(slide) === 'recommended' ? (
                <>
                  <strong>Recommended</strong> based on your tags
                </>
              ) : (
                <div>Now Available</div>
              )}
            </div>
            <div className="tags">
              {getRecommendationClass(slide) === 'recommended' && currentUserData
                ? slide.tags
                    ?.filter((tag) => currentUserData.tags.some((userTag) => userTag.id === tag.id))
                    .map((tag) => <span key={tag.id}>{tag.name}</span>)
                : slide.tags?.map((tag) => <span key={tag.id}>{tag.name}</span>)}
            </div>
          </div>

          {!slide.pricing?.discount ? (
            <div className="no-discount">
              <div className="price">
                {slide.pricing?.free ? 'Free to Play' : `$${slide.pricing?.basePrice} USD`}
              </div>
            </div>
          ) : (
            <div className="discount">
              <div className="discount-block">
                <div className="discount-percentage">-{slide.pricing.discountPercentage}%</div>
                <div className="discount-prices">
                  <div className="original-price">${slide.pricing.basePrice}</div>
                  <div className="final-price">${slide.pricing.discountPrice} USD</div>
                </div>
              </div>
            </div>
          )}

          <div className="platform">
            {slide.platformEntries.win && <span className="platform-image win" />}
            {slide.platformEntries.mac && <span className="platform-image mac" />}
          </div>
        </div>
      </Link>

      {!isViewport1600 && summaryHoverStates[slide.id] && (
        <div>
          <HoverSummary
            title={slide.name}
            date={formatDate(slide.releaseDate)}
            screenshots={slide.imageEntries.filter((img) => img.featured).map((img) => img.link)}
            description={slide.description}
            positivePercentage={slide.averageRating}
            totalReviews={slide.reviewsCount}
            tags={slide.tags?.map((tag) => tag.name) || []}
            leftArrow={!isViewport1600}
          />
        </div>
      )}
    </>
  );
}

'use client';

// React
import { useContext, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';
import { AuthContext } from 'contexts/AuthContext';
import Slider from 'react-slick';

// Custom Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Utils
import formatDate from 'utils/formatDate';

// Services
import recommendedGames from 'services/gameData/recommendedGames';
import { Game } from 'types/game.types';

// Images
import responsiveChevron from 'images/ResponsiveChevron.svg';

// Types
import type { FC, JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';

const Recommended: FC = (): JSX.Element => {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // Contexts
  const { userData } = useContext(AuthContext);

  // States
  const [gameHoverStates, setGameHoverStates] = useState<{
    [key: string]: boolean;
  }>({});

  const userTags =
    userData?.tags && userData.tags.length > 0 && userData.tags.map((tag) => tag.id).join(',');

  const recommendedSettings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  const handleMiniItemPointerMove = (id: number): void => {
    setGameHoverStates((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleMiniItemPointerLeave = (id: number): void => {
    setGameHoverStates((prevState) => ({ ...prevState, [id]: false }));
  };

  const renderGameItem = (game: Game): JSX.Element => {
    const positiveCount = game.reviews.filter((review) => review.positive).length;
    const totalReviews = game.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;

    return (
      <div className="mini-item-container" key={game.id}>
        <Link
          className="mini-item"
          href={`/game/${game.id}`}
          onPointerMove={() => handleMiniItemPointerMove(game.id)}
          onPointerLeave={() => handleMiniItemPointerLeave(game.id)}
        >
          <div className="mini-capsule">
            <img src={game.thumbnailEntries.smallHeaderImage} alt={game.name} />
          </div>
          <div className="mini-price">
            <div className={game.pricing.discount ? 'discount' : 'no-discount'}>
              <div className="price">
                {!game.pricing.discount ? (
                  game.pricing.free ? (
                    'Free to Play'
                  ) : (
                    `$${game.pricing.basePrice}`
                  )
                ) : (
                  <div className="mini-discount-block">
                    <div className="discount-percentage">-{game.pricing.discountPercentage}%</div>
                    <div className="discount-prices">
                      <div className="original-price">${game.pricing.basePrice}</div>
                      <div className="final-price">${game.pricing.discountPrice}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
        {!isViewport960 && gameHoverStates[game.id] && (
          <div>
            <HoverSummary
              title={game.name}
              date={formatDate(game.releaseDate)}
              screenshots={game.imageEntries.map((item) => item.link)}
              description={game.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={game.tags.map((item) => item.name)}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderCategorySlide = (start: number, end: number): JSX.Element[] => {
    const categoryGames: Game[] = recommendedGames.slice(start, end);
    return categoryGames.map((game) => renderGameItem(game));
  };

  const renderAllCategories = (): JSX.Element[][] => {
    const categorySlides: JSX.Element[][] = [];

    const slides = Math.floor(recommendedGames.length / 4);
    for (let i = 0; i < slides; i++) {
      const start: number = i * 4;
      const end: number = start + 4;
      categorySlides.push(renderCategorySlide(start, end));
    }
    return categorySlides;
  };

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          RECOMMENDED GAMES BASED ON TAGS &nbsp;YOU LIKE
          <span className="right-btn">
            <Link className="view-more" href={`/search?tags=${userTags}`}>
              {isViewport960 ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    Customize{' '}
                    <Image src={responsiveChevron} className="dive" alt="responsive-chevron" />
                  </div>
                </div>
              ) : (
                <span>CUSTOMIZE &nbsp;YOUR TAGS</span>
              )}
            </Link>
          </span>
        </h2>
        {isViewport960 ? (
          <div className="mobile-mini mini">{renderAllCategories()}</div>
        ) : (
          <div className="mini-slides mini">
            <Slider {...recommendedSettings}>
              {renderAllCategories().map((categorySlide, idx) => (
                <div className="mini-row" key={idx}>
                  {categorySlide}
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommended;

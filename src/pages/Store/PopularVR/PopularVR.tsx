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
import popularVRGames from 'services/gameData/popularVRGames';

// Images
import responsiveChevron from 'images/ResponsiveChevron.svg';

// Types
import type { FC } from 'react';
import type { gamesData } from 'services/gameData/gameData';

const PopularVR: FC = () => {
  // Initializations
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [gameHoverStates, setGameHoverStates] = useState<{ [key: string]: boolean }>({});

  const vrGamesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  const handleHoverPointerMove = (gameId: number) => {
    setGameHoverStates((prevState) => ({
      ...prevState,
      [gameId]: true,
    }));
  };

  const handleHoverPointerLeave = (gameId: number) => {
    setGameHoverStates((prevState) => ({
      ...prevState,
      [gameId]: false,
    }));
  };

  const renderGameItem = (game: gamesData, index: number) => {
    const positiveCount = game.reviews.filter((review) => review.type === 'positive').length;
    const totalReviews = game.reviews.length;
    const positivePercentage = (positiveCount / totalReviews) * 100;
    return (
      <div className="mini-item-container" key={index}>
        <Link
          className="mini-item"
          href={`/game/${game.id}`}
          onPointerMove={() => handleHoverPointerMove(game.id)}
          onPointerLeave={() => handleHoverPointerLeave(game.id)}
        >
          <div className="mini-capsule">
            <img src={game.smallHeaderImage} alt={game.name} />
          </div>
          <div className="mini-price">
            <div className={game.discount ? 'discount' : 'no-discount'}>
              <div className="price">
                {!game.discount ? (
                  `${!game.free ? '$' : ''}${game.price}`
                ) : (
                  <div className="mini-discount-block">
                    <div className="discount-percentage">-{game.discountPercentage}%</div>
                    <div className="discount-prices">
                      <div className="original-price">${game.price}</div>
                      <div className="final-price">${game.discountPrice}</div>
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
              date={game.releaseDate}
              screenshots={game.moviesAndImages
                .filter((item) => item.type === 'image' && item.featured)
                .map((item) => item.link)}
              description={game.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={game.tags}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
  };

  const renderCategorySlide = (start: number, end: number) => {
    const categoryGames = popularVRGames.slice(start, end);
    return categoryGames.map((game, index) => renderGameItem(game, index));
  };

  const renderAllCategories = () => {
    const categorySlides = [];

    const slides = Math.floor(popularVRGames.length / 4);
    for (let i = 0; i < slides; i++) {
      const start = i * 4;
      const end = start + 4;
      categorySlides.push(renderCategorySlide(start, end));
    }
    return categorySlides;
  };

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          POPULAR VR GAMES
          <span className="right-btn">
            <Link className="view-more" href="/search?tags=VR">
              {isViewport960 ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More <Image src={responsiveChevron} className="dive" alt="responsive-chevron" />
                  </div>
                </div>
              ) : (
                <span>BROWSE ALL</span>
              )}
            </Link>
          </span>
        </h2>
        {isViewport960 ? (
          <div className="mobile-mini mini">{renderAllCategories()}</div>
        ) : (
          <div className="mini-slides mini">
            <Slider {...vrGamesSettings}>
              {renderAllCategories().map((categorySlide, index) => (
                <div className="mini-row" key={index}>
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

export default PopularVR;

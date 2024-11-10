// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import { useGetByTagsQuery } from '@store/apis/game/data';

// Components
import Slider from 'react-slick';
import Item from './Item';

// Skeletons
import Skeleton from './Skeleton';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Images
import responsiveChevron from '@images/ResponsiveChevron.svg';

// Types
import type { Game } from '@interfaces/game';
import type { JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';

export default function Recommended() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960 = useResponsiveViewport(960);

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);

  //---------------------------- Redux Queries ----------------------------//
  const { data: recommendedGames, isLoading } = useGetByTagsQuery({
    tags: currentUserData?.tags.map((tag) => tag.id) ?? [],
    excludedGames: currentUserData?.library.map((game) => game.id) ?? [],
    limit: 24,
  });

  //---------------------------- Slider Config ----------------------------//
  const recommendedSettings: SliderSettings = {
    dots: recommendedGames && recommendedGames.length >= 8,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
    arrows: recommendedGames && recommendedGames.length >= 8,
  };

  //-------------------------- Utility Functions --------------------------//
  const renderCategorySlide = (start: number, end: number): JSX.Element[] => {
    const categoryGames: Game[] = recommendedGames?.slice(start, end) ?? [];
    return categoryGames.map((game) => <Item game={game} key={game.id} />);
  };

  const renderAllCategories = (): JSX.Element[][] => {
    const categorySlides: JSX.Element[][] = [];

    const slides = Math.floor((recommendedGames && recommendedGames.length / 4) ?? 0);
    for (let i = 0; i < slides; i++) {
      const start: number = i * 4;
      const end: number = start + 4;
      categorySlides.push(renderCategorySlide(start, end));
    }
    return categorySlides;
  };

  //-------------------------- Render UI Section --------------------------//
  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          RECOMMENDED GAMES BASED ON TAGS &nbsp;YOU LIKE
          <span className="right-btn">
            <Link
              className="view-more"
              href={`/search?tags=${currentUserData?.tags.map((tag) => tag.id)}`}
            >
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
}

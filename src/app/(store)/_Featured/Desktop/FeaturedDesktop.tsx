// NextJS
import dynamic from 'next/dynamic';

// Slick
import Slider from 'react-slick';

// Components
const Slide = dynamic(() => import('./Slide'));

// Types
import type { Game } from '@interfaces/game';
import type { Settings as SliderSettings } from 'react-slick';

interface FeaturedDesktopProps {
  featuredGames: Game[];
}

export default function FeaturedDesktop({ featuredGames }: FeaturedDesktopProps) {
  // Slider Settings
  const featuredSettings: SliderSettings = {
    dots: featuredGames.length > 1,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: featuredGames.length > 1,
  };

  return (
    <div className="featured-carousel">
      <div className="main-carousel-content">
        <h2 className="home-titles">Featured & Recommended</h2>
        <Slider {...featuredSettings}>
          {featuredGames.map((slide) => (
            <Slide slide={slide} key={slide.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

// NextJS
import dynamic from 'next/dynamic';

// Components
const Slide = dynamic(() => import('./Slide'));

// Types
import type { Game } from '@entities/game.entity';

interface FeaturedMobileProps {
  featuredGames: Game[];
}

export default function FeaturedMobile({ featuredGames }: FeaturedMobileProps) {
  return (
    <div className="featured-carousel">
      <div className="main-carousel-content">
        <h2 className="home-titles">Featured & Recommended</h2>
        <div className="mobile-carousel">
          {featuredGames.map((slide) => (
            <Slide slide={slide} key={slide.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

// NextJS
import Link from 'next/link';

// Types
import type { Game } from '@entities/game.entity';

interface SlideProps {
  slide: Game;
}

export default function Slide({ slide }: SlideProps) {
  return (
    <Link className="mobile-capsule" href={`/game/${slide.id}`}>
      <div
        className="mobile-capsule-content"
        style={{ backgroundImage: `url(${slide.thumbnailEntries.mainImage})` }}
      />

      <div className="info-card">
        <div className="app-name">
          <div>{slide.name}</div>
        </div>

        {!slide.pricing?.discount ? (
          <div className="no-discount">
            <div className="price">${slide.pricing?.basePrice}</div>
          </div>
        ) : (
          <div className="discount">
            <div className="price">
              <div className="discount-block">
                <div className="discount-percentage">-{slide.pricing.discountPercentage}%</div>
                <div className="discount-prices">
                  <div className="original-price">${slide.pricing.basePrice}</div>
                  <div className="final-price">${slide.pricing.discountPrice}</div>
                </div>
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
  );
}

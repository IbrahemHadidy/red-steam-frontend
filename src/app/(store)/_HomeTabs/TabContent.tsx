'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Types
import type { Game } from '@interfaces/game';
import type { TabContentProps } from './HomeTabs.types';

export default function TabContent({
  items,
  title,
  isOpened,
  seeMore,
  onTabHover,
  setHoveredGame,
}: TabContentProps) {
  const [focusedTab, setFocusedTab] = useState<number | null>(null);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    if (!hasHovered && isOpened) {
      setFocusedTab(0);
      onTabHover(0);
      setHasHovered(true);
      setHoveredGame(items[0]);
    }
  }, [title, isOpened, onTabHover, hasHovered, setHoveredGame, items]);

  const handleMouseEnter = (game: Game, idx: number): void => {
    setFocusedTab(idx);
    onTabHover(idx);
    setHoveredGame(game);
  };

  return (
    (<div
      className={`content-list ${isOpened ? 'opened-tab' : ''}`}
      id={`tab-${title.toLowerCase().replace(/\s/g, '')}`}
    >
      <div className="tab-see-more">
        See more:
        <Link className="btn-white-transparent" href={seeMore}>
          <span>{title}</span>
        </Link>
      </div>
      {items.map((tabItem, idx) => (
        <Link
          className={`tab-item ${idx === focusedTab ? 'focus' : ''}`}
          href={`/game/${tabItem.id}`}
          key={tabItem.id}
          onMouseEnter={() => handleMouseEnter(tabItem, idx)}
        >
          <div className="tab-item-cap">
            <img
              className="tab-item-cap-img"
              src={tabItem.thumbnailEntries.tabImage}
              alt={tabItem.name}
            />
          </div>

          <div className="tab-item-discount">
            {!tabItem.pricing?.discount ? (
              <div className="tab-final-price">
                {tabItem.pricing?.free ? 'Free to Play' : `$${tabItem.pricing?.basePrice}`}
              </div>
            ) : (
              <>
                <div className="discount-prices">
                  <div className="original-price">${tabItem.pricing.basePrice}</div>
                  <div className="final-price">${tabItem.pricing.discountPrice}</div>
                </div>

                <div className="discount-percentage">-{tabItem.pricing.discountPercentage}%</div>
              </>
            )}
          </div>

          <div className="tab-item-content">
            <div className="tab-item-name">{tabItem.name}</div>

            <div className="tab-item-details">
              <span className={tabItem.platformEntries.win ? 'win' : ''}></span>
              <span className={tabItem.platformEntries.mac ? 'mac' : ''}></span>

              <div className="tab-item-top-tags">
                {tabItem.tags && (
                  <>
                    <span className="tab-top-tag">{tabItem.tags[0].name}</span>

                    <span className="tab-top-tag">
                      {tabItem.tags[1] && ', '}
                      {tabItem.tags[1].name}
                    </span>

                    <span className="tab-top-tag">
                      {tabItem.tags[2] && ', '}
                      {tabItem.tags[2].name}
                    </span>

                    <span className="tab-top-tag">
                      {tabItem.tags[3] && ', '}
                      {tabItem.tags[3].name}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>)
  );
}

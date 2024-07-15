'use client';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { gamesData } from 'services/gameData/gameData';

const TabContent: FC<{
  items: gamesData[];
  title: string;
  isOpened: boolean;
  seeMore: string;
  onTabHover: (index: number | null) => void;
}> = ({ items, title, isOpened, seeMore, onTabHover }) => {
  const [focusedTab, setFocusedTab] = useState<number | null>(null);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    if (!hasHovered && isOpened) {
      setFocusedTab(0);
      onTabHover(0);
      setHasHovered(true);
    }
  }, [title, isOpened, onTabHover, hasHovered]);

  const handleMouseEnter = (index: number) => {
    setFocusedTab(index);
    onTabHover(index);
  };

  return (
    <div
      className={`content-list ${isOpened ? 'opened-tab' : ''}`}
      id={`tab-${title.toLowerCase().replace(/\s/g, '')}`}
    >
      <div className="tab-see-more">
        See more:
        <Link className="btn-white-transparent" href={seeMore}>
          <span>{title}</span>
        </Link>
      </div>
      {items.map((tabItem: gamesData, index) => (
        <Link
          className={`tab-item ${index === focusedTab ? 'focus' : ''}`}
          href={`/game/${tabItem.id}`}
          key={index}
          onPointerMove={() => handleMouseEnter(index)}
        >
          <div className="tab-item-cap">
            <img className="tab-item-cap-img" src={tabItem.tabImage} alt={tabItem.name} />
          </div>
          <div className="tab-item-discount">
            {!tabItem.discount ? (
              <div className="tab-final-price">
                {!tabItem.free && '$'}
                {tabItem.price}
              </div>
            ) : (
              <>
                <div className="discount-prices">
                  <div className="original-price">${tabItem.price}</div>
                  <div className="final-price">${tabItem.discountPrice}</div>
                </div>
                <div className="discount-percentage">-{tabItem.discountPercentage}%</div>
              </>
            )}
          </div>
          <div className="tab-item-content">
            <div className="tab-item-name">{tabItem.name}</div>
            <div className="tab-item-details">
              <span className={tabItem.win || ''}></span>
              <span className={tabItem.mac || ''}></span>
              <div className="tab-item-top-tags">
                <span className="tab-top-tag">{tabItem.tags[0]}</span>
                <span className="tab-top-tag">
                  {tabItem.tags[1] && ', '}
                  {tabItem.tags[1]}
                </span>
                <span className="tab-top-tag">
                  {tabItem.tags[2] && ', '}
                  {tabItem.tags[2]}
                </span>
                <span className="tab-top-tag">
                  {tabItem.tags[3] && ', '}
                  {tabItem.tags[3]}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TabContent;

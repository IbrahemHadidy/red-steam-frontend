'use client';

// React
import { useEffect, useState } from 'react';

// Components
import Tab from './Tab';
import TabContent from './TabContent';

// Services
import { getByNewest, getBySpecials, getByTopSales, getByUpcoming } from '@services/game/data';

// Types
import type { Game } from '@entities/game.entity';
import type { FC, JSX } from 'react';
import type { LeftSectionProps } from '../Store.types';

const LeftSection: FC<LeftSectionProps> = ({
  openedTab,
  handleTabClick,
  onTabHover,
  setHoveredGame,
}): JSX.Element => {
  const [newAndTrending, setNewAndTrending] = useState<Game[]>([]);
  const [popularUpcoming, setPopularUpcoming] = useState<Game[]>([]);
  const [specials, setSpecials] = useState<Game[]>([]);
  const [topSellers, setTopSellers] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newAndTrending, specials, topSellers, popularUpcoming] = await Promise.all([
          getByTopSales(),
          getBySpecials(),
          getByNewest(),
          getByUpcoming(),
        ]);
        setNewAndTrending(newAndTrending);
        setSpecials(specials);
        setTopSellers(topSellers);
        setPopularUpcoming(popularUpcoming);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabsRow = [
    { tabName: 'newreleases', tabTitle: 'New & Trending' },
    { tabName: 'topsellers', tabTitle: 'Top Sellers' },
    { tabName: 'upcoming', tabTitle: 'Popular Upcoming' },
    { tabName: 'specials', tabTitle: 'Specials' },
  ];

  const tabsContent = [
    {
      items: newAndTrending,
      title: 'New & Trending',
      seeMore: '/search?sort=Release%20date',
    },
    { items: topSellers, title: 'Top Sellers', seeMore: '/search?sort=Relevance' },
    {
      items: popularUpcoming,
      title: 'Popular Upcoming',
      seeMore: '/search?sort=Release%20date',
    },
    { items: specials, title: 'Specials', seeMore: '/search?sort=Relevance' },
  ];

  return loading ? (
    // TODO: add loading skeleton
    <></>
  ) : (
    <div className="tab-left">
      <div className="tabs-row">
        <div className="tabs-mini-slider">
          <div className="tabs-mini-slider-content">
            <div className="tabs-row">
              {tabsRow.map((tab) => (
                <Tab
                  key={tab.tabName}
                  tabName={tab.tabName}
                  tabTitle={tab.tabTitle}
                  handleTabClick={handleTabClick}
                  openedTab={openedTab}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tabs-content">
        {tabsContent.map(
          (tab) =>
            tab.items.length > 0 && (
              <TabContent
                key={tab.title}
                items={tab.items}
                title={tab.title}
                seeMore={tab.seeMore}
                isOpened={openedTab === tab.title}
                onTabHover={onTabHover}
                setHoveredGame={setHoveredGame}
              />
            )
        )}
      </div>
    </div>
  );
};

export default LeftSection;

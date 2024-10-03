'use client';

// React
import { useContext, useEffect, useState } from 'react';

// Components
import Tab from './Tab';
import TabContent from './TabContent';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Services
import { getByNewest, getBySpecials, getByTopSales, getByUpcoming } from '@services/game/data';

// Types
import type { Game } from '@entities/game.entity';
import type { JSX } from 'react';
import type { LeftSectionProps } from '../Store.types';

export default function LeftSection({
  openedTab,
  handleTabClick,
  onTabHover,
  setHoveredGame,
}: LeftSectionProps): JSX.Element {
  // Contexts
  const { userData } = useContext(AuthContext);

  // States
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
          getByNewest((userData && userData.library.map((game) => game.id)) || []),
          getBySpecials((userData && userData.library.map((game) => game.id)) || []),
          getByTopSales((userData && userData.library.map((game) => game.id)) || []),
          getByUpcoming((userData && userData.library.map((game) => game.id)) || []),
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
  }, [userData]);

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
      seeMore: '/search?sort=Release%20Date',
    },
    { items: topSellers, title: 'Top Sellers', seeMore: '/search?sort=Relevance' },
    {
      items: popularUpcoming,
      title: 'Popular Upcoming',
      seeMore: '/search?sort=Release%20Date',
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
}

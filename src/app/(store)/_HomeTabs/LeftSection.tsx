// Components
import Tab from './Tab';
import TabContent from './TabContent';

// Types
import type { LeftSectionProps } from '../Store.types';

export default function LeftSection({
  openedTab,
  handleTabClick,
  onTabHover,
  setHoveredGame,
  newAndTrending,
  specials,
  topSellers,
  popularUpcoming,
}: LeftSectionProps) {
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

  return (
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
            tab.items &&
            tab.items.length > 0 && (
              <TabContent
                key={tab.title}
                items={tab.items ?? []}
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

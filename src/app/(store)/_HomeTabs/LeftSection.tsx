// Components
import Tab from './Tab';
import TabContent from './TabContent';

// Types
import type { Game } from '@interfaces/game';
import type { OpenedTab } from '../Store.types';

interface LeftSectionProps {
  openedTab: OpenedTab;
  handleTabClick: (tabTitle: OpenedTab) => void;
  hoveredTabIndex: number | null;
  onTabHover: (index: number | null) => void;
  setHoveredGame: (game: Game | null) => void;
  newAndTrending: Game[];
  specials: Game[];
  topSellers: Game[];
  popularUpcoming: Game[];
}

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
  //------------------------ Tabs Content Config --------------------------//
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

  //-------------------------- Render UI Section --------------------------//
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

// Components
import Tab from './Tab';
import TabContent from './TabContent';

// Enums
import { OpenedTab } from '@enums/tabs';

// Types
import type { Game } from '@interfaces/game';

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
    { tabName: 'newreleases', tabTitle: OpenedTab.NEW_AND_TRENDING },
    { tabName: 'topsellers', tabTitle: OpenedTab.TOP_SELLERS },
    { tabName: 'upcoming', tabTitle: OpenedTab.POPULAR_UPCOMING },
    { tabName: 'specials', tabTitle: OpenedTab.SPECIALS },
  ];

  const tabsContent = [
    {
      items: newAndTrending,
      title: OpenedTab.NEW_AND_TRENDING,
      seeMore: '/search?sort=Release%20Date',
    },
    { items: topSellers, title: 'Top Sellers', seeMore: '/search?sort=Relevance' },
    {
      items: popularUpcoming,
      title: OpenedTab.POPULAR_UPCOMING,
      seeMore: '/search?sort=Release%20Date',
    },
    { items: specials, title: 'Specials', seeMore: '/search?sort=Relevance' },
  ];

  //------------------------------- Render --------------------------------//
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

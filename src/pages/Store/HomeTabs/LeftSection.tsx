import { FC } from "react";
import {
  newAndTrending,
  popularUpcoming,
  specials,
  topSellers,
} from "./homeTabsItems";
import Tab from "./Tab";
import TabContent from "./TabContent";

interface LeftSectionProps {
  openedTab: string | number;
  handleTabClick: (tabTitle: string) => void;
  hoveredTabIndex: number | null;
  onTabHover: (index: number | null) => void;
}

export const LeftSection: FC<LeftSectionProps> = ({
  openedTab,
  handleTabClick,
  onTabHover,
}) => {
  return (
    <div className="tab-left">
      <div className="tabs-row">
        <div className="tabs-mini-slider">
          <div className="tabs-mini-slider-content">
            <div className="tabs-row">
              {[
                { tabName: "newreleases", tabTitle: "New & Trending" },
                { tabName: "topsellers", tabTitle: "Top Sellers" },
                { tabName: "upcoming", tabTitle: "Popular Upcoming" },
                { tabName: "specials", tabTitle: "Specials" },
              ].map((tab, index) => (
                <Tab
                  key={index}
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
        {[
          { items: newAndTrending, title: "New & Trending" },
          { items: topSellers, title: "Top Sellers" },
          { items: popularUpcoming, title: "Popular Upcoming" },
          { items: specials, title: "Specials" },
        ].map((tab, index) => (
          <TabContent
            key={index}
            items={tab.items}
            title={tab.title}
            isOpened={openedTab === tab.title}
            onTabHover={onTabHover}
          />
        ))}
      </div>
    </div>
  );
};

import { FC } from "react";
import { newAndTrending, popularUpcoming, specials, tabItem, topSellers } from "./homeTabsItems";
import { renderScreenshots } from "./renderScreenshots";

interface RightSectionProps {
  openedTab: string | number;
  hoveredTabIndex: number | null;
}

const RightSection: FC<RightSectionProps> = ({ openedTab, hoveredTabIndex }) => {
  // Your existing code for the right section
  return (
    <div className="tab-right">
          <div className="tab-right-content">
            {hoveredTabIndex !== null && (
              <div className="tab-preview">
                <h2>
                  {openedTab === "New & Trending"
                    ? newAndTrending[hoveredTabIndex].gameName
                    : openedTab === "Top Sellers"
                    ? topSellers[hoveredTabIndex].gameName
                    : openedTab === "Popular Upcoming"
                    ? popularUpcoming[hoveredTabIndex].gameName
                    : openedTab === "Specials"
                    ? specials[hoveredTabIndex].gameName
                    : ""}
                </h2>
                <div className="tab-review-summary">
                  <div className="review-title">Overall user reviews:</div>
                  <span className="game-review-summary positive">Positive</span>
                  <span>&nbsp;(3,549)</span>
                </div>
                <div className="tab-tags">
                  {openedTab === "New & Trending" ||
                  openedTab === "Top Sellers" ||
                  openedTab === "Popular Upcoming" ||
                  openedTab === "Specials"
                    ? [...Array(5).keys()].map((index) => {
                        const tag = (
                          openedTab === "New & Trending"
                            ? newAndTrending[hoveredTabIndex]
                            : openedTab === "Top Sellers"
                            ? topSellers[hoveredTabIndex]
                            : openedTab === "Popular Upcoming"
                            ? popularUpcoming[hoveredTabIndex]
                            : specials[hoveredTabIndex]
                        ) as tabItem;

                        const tagText = tag[`tag${index + 1}` as keyof tabItem];
                        return (
                          tagText && (
                            <a key={index} href="">
                              {tagText}
                            </a>
                          )
                        );
                      })
                    : null}
                </div>
                <div className="tabs-screenshots">
                  {renderScreenshots(openedTab, hoveredTabIndex)}
                </div>
              </div>
            )}
          </div>
        </div>
  );
};

export default RightSection;
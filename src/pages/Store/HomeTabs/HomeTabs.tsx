import { FC, useEffect, useState } from "react";
import { newAndTrending, topSellers, popularUpcoming, specials, } from "./homeTabsItems";
import "./HomeTabs.scss";

interface TabItem {
  gameName: string;
  gameLink: string;
  mainImage: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  tag1?: string | number;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  tag5?: string;
  discount: "no-discount" | "discount";
  discountPercentage?: string;
  price: string;
  discountPrice?: string;
  win: string;
  mac?: string;
}

const TabContent: FC<{
  items: TabItem[];
  title: string;
  isOpened: boolean;
  onTabHover: (index: number | null) => void;
}> = ({ items, title, isOpened, onTabHover }) => {
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
      className={`content-list ${isOpened ? "opened-tab" : ""}`}
      id={`tab-${title.toLowerCase().replace(/\s/g, "")}`}
    >
      <div className="tab-see-more">
        See more:
        <a className="btn-white-transparent" href="">
          <span>{title}</span>
        </a>
      </div>
      {items.map((tabItem: TabItem, index) => (
        <a
          className={`tab-item ${index === focusedTab ? "focus" : ""}`}
          href={tabItem.gameLink}
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          <div className="tab-item-cap">
            <img
              className="tab-item-cap-img"
              src={tabItem.mainImage}
              alt={tabItem.gameName}
            />
          </div>
          <div className="tab-item-discount">
            {tabItem.discount === "no-discount" ? (
              <div className="tab-final-price">{tabItem.price}</div>
            ) : (
              <>
                <div className="discount-prices">
                  <div className="original-price">{tabItem.price}</div>
                  <div className="final-price">{tabItem.discountPrice}</div>
                </div>
                <div className="discount-percentage">
                  {tabItem.discountPercentage}
                </div>
              </>
            )}
          </div>
          <div className="tab-item-content">
            <div className="tab-item-name">{tabItem.gameName}</div>
            <div className="tab-item-details">
              <span className={tabItem.win || ""}></span>
              <span className={tabItem.mac || ""}></span>
              <div className="tab-item-top-tags">
                <span className="tab-top-tag">{tabItem.tag1}</span>
                <span className="tab-top-tag">{(tabItem.tag2)&&", "}{tabItem.tag2}</span>
                <span className="tab-top-tag">{(tabItem.tag3)&&", "}{tabItem.tag3}</span>
                <span className="tab-top-tag">{(tabItem.tag4)&&", "}{tabItem.tag4}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

const getImageURL = (
  openedTab: string | number | never,
  hoveredTabIndex: string | number,
  imageNumber: number
) => {
  const tabs = {
    "New & Trending": newAndTrending,
    "Top Sellers": topSellers,
    "Popular Upcoming": popularUpcoming,
    "Specials": specials,
  };
  //@ts-expect-error "any type error"
  const currentTab = tabs[openedTab] || [];
  return currentTab[hoveredTabIndex]?.[`image${imageNumber}`] || "";
};

const renderScreenshots = (
  openedTab: string | number,
  hoveredTabIndex: number
) => {
  return [...Array(4).keys()].map((index) => (
    <div
      className="tabs-screenshot"
      style={{
        backgroundImage: `url(${getImageURL(
          openedTab,
          hoveredTabIndex,
          index + 1
        )})`,
      }}
      key={index}
    ></div>
  ));
};

interface TabProps {
  tabName: string;
  tabTitle: string;
  handleTabClick: (tabTitle: string) => void;
  openedTab: string | number;
}

const Tab: React.FC<TabProps> = ({
  tabName,
  tabTitle,
  handleTabClick,
  openedTab,
}) => (
  <div
    className={`tab-${tabName} ${openedTab === tabTitle ? "active-tab" : ""}`}
    onClick={() => handleTabClick(tabTitle)}
  >
    <div className="tab-content">{tabTitle}</div>
  </div>
);

const HomeTabs: FC = () => {
  const [openedTab, setOpenedTab] = useState<string | number>("New & Trending");
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  const handleTabClick = (tab: string) => {
    setOpenedTab(tab);
  };

  const handleTabHover = (index: number | null) => {
    setHoveredTabIndex(index);
  };

  return (
    <div className="tab-container">
      <div className="tab-contents">
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
                onTabHover={handleTabHover}
              />
            ))}
          </div>
        </div>
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
                        ) as TabItem;

                        const tagText = tag[`tag${index + 1}` as keyof TabItem];
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
      </div>
    </div>
  );
};

export default HomeTabs;

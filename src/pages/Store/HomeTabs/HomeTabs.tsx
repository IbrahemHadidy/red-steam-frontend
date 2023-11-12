import { FC, useEffect, useState } from "react";
import {
  newAndTrending,
  topSellers,
  popularUpcoming,
  specials,
} from "./homeTabsItems";
import "./HomeTabs.css";

interface TabItem {
  gameName: string;
  gameLink: string;
  mainImage: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  tag1?: string;
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

  const handleMouseEnter = (index: number) => {
    setFocusedTab(index);
    onTabHover(index);
  };

  useEffect(() => {
    if (title === "New & Trending") {
      setFocusedTab(0);
      onTabHover(0);
    }
  }, [title, onTabHover]);

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
                <div className="discount-percentage">
                  {tabItem.discountPercentage}
                </div>
                <div className="discount-prices">
                  <div className="original-price">{tabItem.price}</div>
                  <div className="final-price">{tabItem.discountPrice}</div>
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
                <span className="tab-top-tag">{tabItem.tag2}</span>
                <span className="tab-top-tag">{tabItem.tag3}</span>
                <span className="tab-top-tag">{tabItem.tag4}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

const HomeTabs: FC = () => {
  const [openedTab, setOpenedTab] = useState<string | null>("New & Trending");
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
                <div
                  className={`tab-newreleases ${
                    openedTab === "New & Trending" ? "active-tab" : ""
                  }`}
                  onClick={() => handleTabClick("New & Trending")}
                >
                  <div className="tab-content">New & Trending</div>
                </div>
                <div
                  className={`tab-topsellers ${
                    openedTab === "Top Sellers" ? "active-tab" : ""
                  }`}
                  onClick={() => handleTabClick("Top Sellers")}
                >
                  <div className="tab-content">Top Sellers</div>
                </div>
                <div
                  className={`tab-upcoming ${
                    openedTab === "Popular Upcoming" ? "active-tab" : ""
                  }`}
                  onClick={() => handleTabClick("Popular Upcoming")}
                >
                  <div className="tab-content">Popular Upcoming</div>
                </div>
                <div
                  className={`tab-specials ${
                    openedTab === "Specials" ? "active-tab" : ""
                  }`}
                  onClick={() => handleTabClick("Specials")}
                >
                  <div className="tab-content">Specials</div>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-content">
            <TabContent
              items={newAndTrending}
              title="New & Trending"
              isOpened={openedTab === "New & Trending"}
              onTabHover={handleTabHover}
            />
            <TabContent
              items={topSellers}
              title="Top Sellers"
              isOpened={openedTab === "Top Sellers"}
              onTabHover={handleTabHover}
            />
            <TabContent
              items={popularUpcoming}
              title="Popular Upcoming"
              isOpened={openedTab === "Popular Upcoming"}
              onTabHover={handleTabHover}
            />
            <TabContent
              items={specials}
              title="Specials"
              isOpened={openedTab === "Specials"}
              onTabHover={handleTabHover}
            />
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
                  <span className="game-review-summary positive"></span>
                  <span>&nbsp;(3,549)</span>
                </div>
                <div className="tags">
                  {openedTab === "New & Trending" &&
                    newAndTrending[hoveredTabIndex].tag1 && (
                      <a href="">{newAndTrending[hoveredTabIndex].tag1}</a>
                    )}
                  {openedTab === "Top Sellers" &&
                    topSellers[hoveredTabIndex].tag1 && (
                      <a href="">{topSellers[hoveredTabIndex].tag1}</a>
                    )}
                  {openedTab === "Popular Upcoming" &&
                    popularUpcoming[hoveredTabIndex].tag1 && (
                      <a href="">{popularUpcoming[hoveredTabIndex].tag1}</a>
                    )}
                  {openedTab === "Specials" &&
                    specials[hoveredTabIndex].tag1 && (
                      <a href="">{specials[hoveredTabIndex].tag1}</a>
                    )}
                  {openedTab === "New & Trending" &&
                    newAndTrending[hoveredTabIndex].tag2 && (
                      <a href="">{newAndTrending[hoveredTabIndex].tag2}</a>
                    )}
                  {openedTab === "Top Sellers" &&
                    topSellers[hoveredTabIndex].tag2 && (
                      <a href="">{topSellers[hoveredTabIndex].tag2}</a>
                    )}
                  {openedTab === "Popular Upcoming" &&
                    popularUpcoming[hoveredTabIndex].tag2 && (
                      <a href="">{popularUpcoming[hoveredTabIndex].tag2}</a>
                    )}
                  {openedTab === "Specials" &&
                    specials[hoveredTabIndex].tag2 && (
                      <a href="">{specials[hoveredTabIndex].tag2}</a>
                    )}
                  {openedTab === "New & Trending" &&
                    newAndTrending[hoveredTabIndex].tag3 && (
                      <a href="">{newAndTrending[hoveredTabIndex].tag3}</a>
                    )}
                  {openedTab === "Top Sellers" &&
                    topSellers[hoveredTabIndex].tag3 && (
                      <a href="">{topSellers[hoveredTabIndex].tag3}</a>
                    )}
                  {openedTab === "Popular Upcoming" &&
                    popularUpcoming[hoveredTabIndex].tag3 && (
                      <a href="">{popularUpcoming[hoveredTabIndex].tag3}</a>
                    )}
                  {openedTab === "Specials" &&
                    specials[hoveredTabIndex].tag3 && (
                      <a href="">{specials[hoveredTabIndex].tag3}</a>
                    )}
                  {openedTab === "New & Trending" &&
                    newAndTrending[hoveredTabIndex].tag4 && (
                      <a href="">{newAndTrending[hoveredTabIndex].tag4}</a>
                    )}
                  {openedTab === "Top Sellers" &&
                    topSellers[hoveredTabIndex].tag4 && (
                      <a href="">{topSellers[hoveredTabIndex].tag4}</a>
                    )}
                  {openedTab === "Popular Upcoming" &&
                    popularUpcoming[hoveredTabIndex].tag4 && (
                      <a href="">{popularUpcoming[hoveredTabIndex].tag4}</a>
                    )}
                  {openedTab === "Specials" &&
                    specials[hoveredTabIndex].tag4 && (
                      <a href="">{specials[hoveredTabIndex].tag4}</a>
                    )}
                  {openedTab === "New & Trending" &&
                    newAndTrending[hoveredTabIndex].tag5 && (
                      <a href="">{newAndTrending[hoveredTabIndex].tag5}</a>
                    )}
                  {openedTab === "Top Sellers" &&
                    topSellers[hoveredTabIndex].tag5 && (
                      <a href="">{topSellers[hoveredTabIndex].tag5}</a>
                    )}
                  {openedTab === "Popular Upcoming" &&
                    popularUpcoming[hoveredTabIndex].tag5 && (
                      <a href="">{popularUpcoming[hoveredTabIndex].tag5}</a>
                    )}
                  {openedTab === "Specials" &&
                    specials[hoveredTabIndex].tag5 && (
                      <a href="">{specials[hoveredTabIndex].tag5}</a>
                    )}
                </div>
                <div
                  className="tabs-screenshot"
                  style={{
                    backgroundImage: `url(${
                      openedTab === "New & Trending"
                        ? newAndTrending[hoveredTabIndex].image1
                        : openedTab === "Top Sellers"
                        ? topSellers[hoveredTabIndex].image1
                        : openedTab === "Popular Upcoming"
                        ? popularUpcoming[hoveredTabIndex].image1
                        : openedTab === "Specials"
                        ? specials[hoveredTabIndex].image1
                        : ""
                    })`,
                  }}
                ></div>
                <div
                  className="tabs-screenshot"
                  style={{
                    backgroundImage: `url(${
                      openedTab === "New & Trending"
                        ? newAndTrending[hoveredTabIndex].image2
                        : openedTab === "Top Sellers"
                        ? topSellers[hoveredTabIndex].image2
                        : openedTab === "Popular Upcoming"
                        ? popularUpcoming[hoveredTabIndex].image2
                        : openedTab === "Specials"
                        ? specials[hoveredTabIndex].image2
                        : ""
                    })`,
                  }}
                ></div>
                <div
                  className="tabs-screenshot"
                  style={{
                    backgroundImage: `url(${
                      openedTab === "New & Trending"
                        ? newAndTrending[hoveredTabIndex].image3
                        : openedTab === "Top Sellers"
                        ? topSellers[hoveredTabIndex].image3
                        : openedTab === "Popular Upcoming"
                        ? popularUpcoming[hoveredTabIndex].image3
                        : openedTab === "Specials"
                        ? specials[hoveredTabIndex].image3
                        : ""
                    })`,
                  }}
                ></div>
                <div
                  className="tabs-screenshot"
                  style={{
                    backgroundImage: `url(${
                      openedTab === "New & Trending"
                        ? newAndTrending[hoveredTabIndex].image4
                        : openedTab === "Top Sellers"
                        ? topSellers[hoveredTabIndex].image4
                        : openedTab === "Popular Upcoming"
                        ? popularUpcoming[hoveredTabIndex].image4
                        : openedTab === "Specials"
                        ? specials[hoveredTabIndex].image4
                        : ""
                    })`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTabs;

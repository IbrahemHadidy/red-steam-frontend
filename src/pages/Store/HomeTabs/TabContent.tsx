import { FC, useEffect, useState } from "react";
import { tabItem } from "./homeTabsItems";


const TabContent: FC<{
    items: tabItem[];
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
        {items.map((tabItem: tabItem, index) => (
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

export default TabContent;
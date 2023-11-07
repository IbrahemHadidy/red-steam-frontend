import React, { FC } from "react";
import { menuData, navigationItems } from "../menuData.ts";

type MenuItem = {
  label: string;
  url: string;
  className: string;
  category?: string;
  specialClass?: string;
};

type GroupedMenuItem = {
  menuTitle: string;
  categoryGroups: Record<string, MenuItem[]>;
};

const DesktopSecondNav: FC = () => {
  const groupedMenuItems: GroupedMenuItem[] = Object.entries(menuData).map(
    ([menuTitle, menu]) => {
      const items = menu.items;
      const categoryGroups: Record<string, MenuItem[]> = {};

      items.forEach((item: MenuItem) => {
        if (item.category) {
          if (!categoryGroups[item.category]) {
            categoryGroups[item.category] = [];
          }
          categoryGroups[item.category].push(item);
        }
      });

      return { menuTitle, categoryGroups };
    }
  );

  return (
    <>
      <div className="d-none d-md-block mx-auto myNavSec">
        <div className="wishlist-Link-div">
          <a
            id="wishlist_link"
            className="store_header_btn_content"
            href="https://store.steampowered.com/wishlist/"
          >
            Wishlist
          </a>
        </div>
        <nav className="navbar navbar-expand-sm navbarBg">
          <ul className="navbar-nav">
            <img
              className="profile_picture"
              src="https://source.unsplash.com/user/c_v_r"
              alt="Avatar"
            />
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
              <li key={index} className="nav-item dropdown">
                <a
                  className={`nav-link navBarItem ${
                    menuTitle === "Your Store" ? "special-class" : ""
                  }`}
                  href=""
                  data-toggle="dropdown"
                >
                  {menuTitle}
                </a>
                <div className={`dropdown-menu ${menuTitle}-div`}>
                  {Object.entries(categoryGroups).map(
                    ([category, categoryItems], categoryIndex) => (
                      <div
                        key={categoryIndex}
                        className={`category-div ${category}`}
                      >
                        {categoryItems.map((categoryItem, itemIndex) => (
                          <a
                            key={itemIndex}
                            className={`menuItem ${categoryItem.className} ${
                              categoryItem.specialClass || ""
                            }`}
                            href={categoryItem.url}
                          >
                            {categoryItem.label}
                          </a>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </li>
            ))}

            {navigationItems.map((item, index) => (
              <a key={index} className="nav-link navBarItem" href={item.url}>
                {item.label}
              </a>
            ))}

            <div className="before-search-space"></div>

            <div id="search">
              <form>
                <input type="hidden" />
                <div className="search">
                  <input
                    name="term"
                    type="text"
                    className="search-input"
                    placeholder="search"
                  />
                  <a href="#" id="search-button">
                    <img alt="Search" src="/images/blank.gif" />
                  </a>
                </div>
              </form>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSecondNav;

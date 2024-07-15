'use client';

// React
import { useContext, useEffect, useState } from 'react';

// Next.js
import Link from 'next/link';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Components
import NavSearch from '../NavSearch';

// Services
import { menuData, navigationItems } from 'services/menus/menuData-mobile';

// Images
import defaultPFP from 'images/default-pfp.png';

// Types
import type { FC } from 'react';
import type { GroupedMenuItem, MenuItem, menuTitle } from '../SecondNavbar.types';

const MobileSecondNav: FC = () => {
  // Contexts
  const { isLoggedIn, userPFP } = useContext(AuthContext);

  // States
  const [openMenu, setOpenMenu] = useState<menuTitle | null>(null);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, []);

  const handleMenuClick = (menuTitle: menuTitle) => {
    if (openMenu === menuTitle) {
      setOpenMenu(null); // Close the menu if it's already open
    } else {
      setOpenMenu(menuTitle); // Open the menu if it's closed
    }
  };

  const groupedMenuItems: GroupedMenuItem[] = Object.entries(menuData).map(([menuTitle, menu]) => {
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
  });

  return (
    <div className="second-nav-mobile">
      <nav className="navbar navbar-expand-sm navbarBg-mobile">
        <div>
          <ul className="navbar-nav navbar-nav-mobile">
            {/* TODO: render real profile image from server */}
            {isLoggedIn && (
              <img
                className="profile_picture-mobile"
                src={userPFP || defaultPFP.src}
                alt="Avatar"
              />
            )}
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
              <li key={index} className="nav-item nav-item-mobile dropdown">
                <a
                  className={`nav-link navBarItem navBarItem-mobile ${
                    menuTitle === 'Your Store' && isLoggedIn ? 'special-class' : ''
                  }`}
                  href="#"
                  onClick={() => handleMenuClick(menuTitle)} // Handle click to open/close the menu
                >
                  {menuTitle}
                </a>
                {/* Conditionally render the dropdown menu based on the openMenu state */}
                {isLoggedIn && openMenu === 'Your Store' && (
                  <div className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}>
                    {Object.entries(categoryGroups).map(
                      ([category, categoryItems], categoryIndex) => (
                        <div key={categoryIndex} className={`category-div ${category}`}>
                          {categoryItems.map((categoryItem, itemIndex) => (
                            <Link
                              key={itemIndex}
                              className={`menuItem ${categoryItem.className}`}
                              href={categoryItem.url}
                            >
                              {categoryItem.label}
                            </Link>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
                {!isLoggedIn && openMenu === 'Your Store' && (
                  <div className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}>
                    <div className="category-div store-div" style={{ marginTop: '-10px' }}>
                      <Link className="menuItem custom-label" href="/">
                        Home
                      </Link>
                    </div>
                  </div>
                )}
                {openMenu === menuTitle && openMenu !== 'Your Store' && (
                  <div className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}>
                    {Object.entries(categoryGroups).map(
                      ([category, categoryItems], categoryIndex) => (
                        <div key={categoryIndex} className={`category-div ${category}`}>
                          {categoryItems.map((categoryItem, itemIndex) => (
                            <Link
                              key={itemIndex}
                              className={`menuItem ${categoryItem.className} ${
                                categoryItem.specialClass || ''
                              }`}
                              href={categoryItem.url}
                            >
                              {categoryItem.label}
                            </Link>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {navigationItems.map((item, index) => (
          <div key={index}>
            <ul className="navbar-nav">
              <li className="nav-item navbar-nav-mobile">
                <Link className="nav-link navBarItem navBarItem-mobile" href={item.url}>
                  {item.label}
                </Link>
              </li>
            </ul>
          </div>
        ))}
        {!isSearchPage && <NavSearch />}
      </nav>
    </div>
  );
};

export default MobileSecondNav;

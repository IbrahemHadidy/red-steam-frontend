'use client';

// React
import { useContext, useEffect, useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// React spring
import { animated, useSpring } from 'react-spring';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Services
import { menuData, navigationItems } from 'services/menus/menuData';

// Components
import NavSearch from '../NavSearch';

// Images
import cart from 'images/cart.svg';
import defaultPFP from 'images/default-pfp.png';

// Types
import type { FC } from 'react';
import type { SpringValue } from 'react-spring';
import type { GroupedMenuItem, MenuItem } from '../SecondNavbar.types';

const DesktopSecondNav: FC = () => {
  // Initializations
  const pathname = usePathname();

  // Contexts
  const { isLoggedIn, userPFP, userData } = useContext(AuthContext);

  // States
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  useEffect(() => {
    if (pathname?.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [pathname]);

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

  const fadeAnimations: Record<string, { opacity: SpringValue<number> }> = {};

  groupedMenuItems.forEach(({ menuTitle }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fadeAnimations[menuTitle] = useSpring({
      opacity: openMenu === menuTitle ? 1 : 0,
      pointerEvents: openMenu === menuTitle ? 'auto' : 'none',
      config: { duration: openMenu ? 30 : 15 },
    });
  });

  return (
    <>
      <div className="d-none d-md-block mx-auto myNavSec">
        <div className="wishlist-cart-container">
          {isLoggedIn && userData && userData?.wishlist && (
            <div className="wishlist-Link-div">
              <Link className="wishlist-link" href="/wishlist">
                Wishlist&nbsp;
                {userData.wishlist.length > 0 && `(${userData?.wishlist?.length})`}
              </Link>
            </div>
          )}
          {isLoggedIn && userData && userData?.cart && (
            <div className="cart-Link-div">
              <Link className="cart-link" href="/cart">
                <Image
                  src={cart}
                  alt="cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginTop: '2.5px',
                  }}
                />
                &nbsp;Cart&nbsp;
                {userData.cart.length > 0 && `(${userData?.cart?.length})`}
              </Link>
            </div>
          )}
        </div>
        <nav className="navbar navbar-expand-sm navbarBg">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <img className="profile-picture" src={userPFP || defaultPFP.src} alt="Avatar" />
            )}
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
              <li
                key={index}
                className="nav-item dropdown"
                onPointerMove={() => setOpenMenu(menuTitle)}
                onPointerLeave={() => setOpenMenu(null)}
              >
                <a
                  className={`nav-link navBarItem ${
                    menuTitle === 'Your Store' && isLoggedIn ? 'special-class' : ''
                  }`}
                >
                  {menuTitle}
                </a>
                <animated.div
                  className={`dropdown-menu ${menuTitle}-div ${isLoggedIn ? 'categoryfix' : ''}`}
                  style={fadeAnimations[menuTitle]}
                >
                  {isLoggedIn && openMenu === 'Your Store' && (
                    <>
                      {Object.entries(categoryGroups).map(
                        (
                          [category, categoryItems]: [string, MenuItem[]],
                          categoryIndex: number
                        ) => (
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
                    </>
                  )}

                  {!isLoggedIn && openMenu === 'Your Store' && (
                    <div className="category-div store-div" style={{ marginTop: '-10px' }}>
                      <Link className="menuItem custom-label" href="/login">
                        Home
                      </Link>
                    </div>
                  )}
                  {openMenu === menuTitle && openMenu !== 'Your Store' && (
                    <>
                      {Object.entries(categoryGroups).map(
                        ([category, categoryItems], categoryIndex) => (
                          <div key={categoryIndex} className={`category-div ${category}`}>
                            {categoryItems.map((categoryItem, itemIndex) => (
                              <Link
                                key={itemIndex}
                                className={`menuItem ${
                                  categoryItem.className
                                } ${categoryItem.specialClass || ''}`}
                                href={categoryItem.url}
                              >
                                {categoryItem.label}
                              </Link>
                            ))}
                          </div>
                        )
                      )}
                    </>
                  )}
                </animated.div>
              </li>
            ))}

            {navigationItems.map((item, index) => (
              <Link key={index} className="nav-link navBarItem" href={item.url}>
                {item.label}
              </Link>
            ))}

            <div className="before-search-space" />
            {!isSearchPage && <NavSearch />}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSecondNav;

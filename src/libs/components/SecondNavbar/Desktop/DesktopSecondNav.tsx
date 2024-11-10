'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// React spring
import { animated, useSpring } from 'react-spring';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Static Data
import { menuData, navigationItems } from './menuData';

// Components
import NavSearch from '../NavSearch';

// Images
import cart from '@images/cart.svg';
import defaultPFP from '@images/default-pfp.png';

// Types
import type { SpringValue } from 'react-spring';
import type { GroupedMenuItem, MenuItem } from '../SecondNavbar.types';

export default function DesktopSecondNav() {
  //--------------------------- Initializations ---------------------------//
  const pathname = usePathname();

  //--------------------------- State Selectors ---------------------------//
  const { isUserLoggedIn, currentUserData } = useAppSelector((state) => state.auth);
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
    const items: MenuItem[] = menu.items;
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
          {isUserLoggedIn && currentUserData && currentUserData?.wishlist.length > 0 && (
            <div className="wishlist-Link-div">
              <Link className="wishlist-link" href="/wishlist">
                Wishlist&nbsp;
                {currentUserData.wishlist.length > 0 && `(${currentUserData.wishlist.length})`}
              </Link>
            </div>
          )}

          {isUserLoggedIn && currentUserData && currentUserData?.cart.length > 0 && (
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
                {currentUserData.cart.length > 0 && `(${currentUserData.cart.length})`}
              </Link>
            </div>
          )}
        </div>

        <nav className="navbar navbar-expand-sm navbarBg">
          <ul className="navbar-nav">
            {isUserLoggedIn && (
              <img
                className="profile-picture"
                src={currentUserData?.profilePicture || defaultPFP.src}
                alt="Avatar"
              />
            )}
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, idx) => (
              <li
                key={idx}
                className="nav-item dropdown"
                onMouseEnter={() => setOpenMenu(menuTitle)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  className={`nav-link navBarItem ${
                    menuTitle === 'Your Store' && isUserLoggedIn ? 'special-class' : ''
                  }`}
                >
                  {menuTitle}
                </a>
                <animated.div
                  className={`dropdown-menu ${menuTitle}-div ${isUserLoggedIn ? 'categoryfix' : ''}`}
                  style={fadeAnimations[menuTitle]}
                >
                  {isUserLoggedIn && openMenu === 'Your Store' && (
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

                  {!isUserLoggedIn && openMenu === 'Your Store' && (
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

            {navigationItems.map((item, idx) => (
              <Link key={idx} className="nav-link navBarItem" href={item.url}>
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
}

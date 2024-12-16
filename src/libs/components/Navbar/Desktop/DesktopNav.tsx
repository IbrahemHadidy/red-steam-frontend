'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Static Data
import menuData from './menuData';

// Components
import NavSearch from '../NavSearch';
import GroupedMenuItem from './GroupedMenuItem';

// Images
import cart from '@images/cart.svg';
import defaultPFP from '@images/default-pfp.png';

// Types
import type { MenuItem } from '../Navbar.types';

export default function DesktopNav() {
  //--------------------------- Initializations ---------------------------//
  const pathname = usePathname();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, currentUserData } = useAppSelector((state) => state.auth);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  //------------------------------- OnMount -------------------------------//
  useEffect(() => {
    if (pathname?.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [pathname]);

  //-------------------------------- Utils --------------------------------//
  const groupedMenuItems = Object.entries(menuData).map(([menuTitle, menu]) => {
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

  //-------------------------------- Render -------------------------------//
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
          <ul className="navbar-nav second-nav">
            {isUserLoggedIn && (
              <img
                className="profile-picture"
                src={currentUserData?.profilePicture ?? defaultPFP.src}
                alt="Avatar"
              />
            )}

            <div className="dropdowns">
              {groupedMenuItems.map(({ menuTitle, categoryGroups }, idx) => (
                <GroupedMenuItem menuTitle={menuTitle} categoryGroups={categoryGroups} key={idx} />
              ))}
            </div>

            {!isSearchPage && <NavSearch />}
          </ul>
        </nav>
      </div>
    </>
  );
}

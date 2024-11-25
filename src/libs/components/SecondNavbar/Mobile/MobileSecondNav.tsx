// React
import { useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Static Data
import { menuData, navigationItems } from './menuData-mobile';

// Components
import NavSearch from '../NavSearch';
import NavigationItem from './NavigationItem';

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import type { MenuItem, menuTitle } from '../SecondNavbar.types';

export default function MobileSecondNav() {
  //--------------------------- Initializations ---------------------------//ializattions
  const path = usePathname();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, currentUserData } = useAppSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState<menuTitle | null>(null);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  useEffect(() => {
    if (path.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [path]);

  const handleMenuClick = (menuTitle: menuTitle): void => {
    if (openMenu === menuTitle) {
      setOpenMenu(null); // Close the menu if it's already open
    } else {
      setOpenMenu(menuTitle); // Open the menu if it's closed
    }
  };

  const groupedMenuItems = Object.entries(menuData).map(([menuTitle, menu]) => {
    const items = menu.items;
    const categoryGroups: Record<string, MenuItem[]> = {};

    items.forEach((item) => {
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
            {isUserLoggedIn && (
              <img
                className="profile_picture-mobile"
                src={currentUserData?.profilePicture ?? defaultPFP.src}
                alt="Avatar"
              />
            )}

            {groupedMenuItems.map(({ menuTitle, categoryGroups }, idx) => (
              <li key={idx} className="nav-item nav-item-mobile dropdown">
                <a
                  className={`nav-link navBarItem navBarItem-mobile ${
                    menuTitle === 'Your Store' && isUserLoggedIn ? 'special-class' : ''
                  }`}
                  href="#"
                  onClick={() => handleMenuClick(menuTitle)}
                >
                  {menuTitle}
                </a>

                {isUserLoggedIn && openMenu === 'Your Store' && (
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

                {!isUserLoggedIn && openMenu === 'Your Store' && (
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
                                categoryItem.specialClass ?? ''
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

        {navigationItems.map((item, idx) => (
          <NavigationItem item={item} key={idx} />
        ))}

        {!isSearchPage && <NavSearch />}
      </nav>
    </div>
  );
}

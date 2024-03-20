import { FC, useContext, useEffect, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { useSpring, animated, SpringValue } from 'react-spring';
import { AuthContext } from 'contexts/AuthContext';
import { menuData, navigationItems } from 'services/menuData';
import NavSearch from '../NavSearch';

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
  const navigate = useSoftNavigate();
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, []);
  

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
    },
  );

  const fadeAnimations: Record<string, { opacity: SpringValue<number> }> = {};

  groupedMenuItems.forEach(({ menuTitle }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fadeAnimations[menuTitle] = useSpring({
      opacity: openMenu === menuTitle ? 1 : 0,
      config: { duration: openMenu ? 30 : 15 },
    });
  });

  return (
    <>
      <div className="d-none d-md-block mx-auto myNavSec">
        <div className="wishlist-cart-container">
          {isLoggedIn && userData && userData?.wishlist && (
            <div className="wishlist-Link-div">
              <a
                className="wishlist-link"
                href="/wishlist"
                onClick={e => {
                  navigate('/wishlist', e);
                }}
              >
                Wishlist&nbsp;
                {userData.wishlist.length > 0 &&
                  `(${userData?.wishlist?.length})`}
              </a>
            </div>
          )}
          {isLoggedIn && userData && userData?.cart && (
            <div className="cart-Link-div">
              <a
                className="cart-link"
                href="/cart"
                onClick={e => {
                  navigate('/cart', e);
                }}
              >
                <img
                  src="/images/cart.svg"
                  alt="cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginTop: '2.5px',
                  }}
                />
                &nbsp;Cart&nbsp;
                {userData.cart.length > 0 && `(${userData?.cart?.length})`}
              </a>
            </div>
          )}
        </div>
        <nav className="navbar navbar-expand-sm navbarBg">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <img
                className="profile-picture"
                src={userData?.profilePicture || '/images/default-pfp.png'}
                alt="Avatar"
              />
            )}
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
              <li
                key={index}
                className="nav-item dropdown"
                onMouseEnter={() => setOpenMenu(menuTitle)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  className={`nav-link navBarItem ${
                    menuTitle === 'Your Store' && isLoggedIn
                      ? 'special-class'
                      : ''
                  }`}
                  data-toggle="dropdown"
                >
                  {menuTitle}
                </a>
                <animated.div
                  className={`dropdown-menu ${menuTitle}-div ${
                    isLoggedIn ? 'categoryfix' : ''
                  }`}
                  style={fadeAnimations[menuTitle]}
                >
                  {isLoggedIn && openMenu === 'Your Store' && (
                    <>
                      {Object.entries(categoryGroups).map(
                        (
                          [category, categoryItems]: [string, MenuItem[]],
                          categoryIndex: number,
                        ) => (
                          <div
                            key={categoryIndex}
                            className={`category-div ${category}`}
                          >
                            {categoryItems.map((categoryItem, itemIndex) => (
                              <a
                                key={itemIndex}
                                className={`menuItem ${categoryItem.className}`}
                                onClick={e => {
                                  navigate(categoryItem.url, e);
                                }}
                              >
                                {categoryItem.label}
                              </a>
                            ))}
                          </div>
                        ),
                      )}
                    </>
                  )}

                  {!isLoggedIn && openMenu === 'Your Store' && (
                    <div
                      className="category-div store-div"
                      style={{ marginTop: '-10px' }}
                    >
                      <a
                        className="menuItem custom-label"
                        href="/"
                        onClick={e => {
                          navigate('/', e);
                        }}
                      >
                        Home
                      </a>
                    </div>
                  )}
                  {openMenu === menuTitle && openMenu !== 'Your Store' && (
                    <>
                      {Object.entries(categoryGroups).map(
                        ([category, categoryItems], categoryIndex) => (
                          <div
                            key={categoryIndex}
                            className={`category-div ${category}`}
                          >
                            {categoryItems.map((categoryItem, itemIndex) => (
                              <a
                                key={itemIndex}
                                className={`menuItem ${
                                  categoryItem.className
                                } ${categoryItem.specialClass || ''}`}
                                onClick={e => {
                                  navigate(categoryItem.url, e);
                                }}
                              >
                                {categoryItem.label}
                              </a>
                            ))}
                          </div>
                        ),
                      )}
                    </>
                  )}
                </animated.div>
              </li>
            ))}

            {navigationItems.map((item, index) => (
              <a
                key={index}
                className="nav-link navBarItem"
                onClick={e => {
                  navigate(item.url, e);
                }}
              >
                {item.label}
              </a>
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

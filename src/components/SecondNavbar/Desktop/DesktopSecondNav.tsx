import { FC, useContext, useState } from "react";
import NavSearch from "../NavSearch";
import { useSpring, animated, SpringValue } from "react-spring";
import { AuthContext } from 'contexts/AuthContext';
import { menuData, navigationItems } from "services/menuData";

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
  const { isLoggedIn } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // TODO: Add real user image
  const [imgSrc, setImgSrc] = useState('image_link');
  const handleNoImage = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setImgSrc('/images/default-pfp.png');
  };

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
        {isLoggedIn && (
          <div className="wishlist-Link-div">
            <a className="wishlist-link" href="/wishlist">
              Wishlist
            </a>
          </div>
        )}
        <nav className="navbar navbar-expand-sm navbarBg">
          <ul className="navbar-nav">
            {/* TODO: add real profile pictures from server */}
            {isLoggedIn && (
              <img
                className="profile-picture"
                src={imgSrc}
				onError={handleNoImage}
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
                  href=""
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
                                href={categoryItem.url}
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
                      <a className="menuItem custom-label" href="/">
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
                                href={categoryItem.url}
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
              <a key={index} className="nav-link navBarItem" href={item.url}>
                {item.label}
              </a>
            ))}

            <div className="before-search-space" />
            <NavSearch />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSecondNav;

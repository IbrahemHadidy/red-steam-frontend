import { FC, useState, SetStateAction, useContext, useEffect } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { AuthContext } from 'contexts/AuthContext';
import { menuData, navigationItems } from 'services/menuData-mobile';
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

type menuTitle = string | SetStateAction<null>;

const MobileSecondNav: FC = () => {
  const navigate = useSoftNavigate();
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState<menuTitle | null>(null);
  const [isSearchPage, setIsSearchPage] = useState(false);

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

  return (
    <div className="second-nav-mobile">
      <nav className="navbar navbar-expand-sm navbarBg-mobile">
        <div>
          <ul className="navbar-nav navbar-nav-mobile">
            {/* TODO: render real profile image from server */}
            {isLoggedIn && (
              <img
                className="profile_picture-mobile"
                src={userData?.profilePicture || '/images/default-pfp.png'}
                alt="Avatar"
              />
            )}
            {groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
              <li key={index} className="nav-item nav-item-mobile dropdown">
                <a
                  className={`nav-link navBarItem navBarItem-mobile ${
                    menuTitle === 'Your Store' && isLoggedIn
                      ? 'special-class'
                      : ''
                  }`}
                  href="#"
                  onClick={() => handleMenuClick(menuTitle)} // Handle click to open/close the menu
                >
                  {menuTitle}
                </a>
                {/* Conditionally render the dropdown menu based on the openMenu state */}
                {isLoggedIn && openMenu === 'Your Store' && (
                  <div
                    className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}
                  >
                    {Object.entries(categoryGroups).map(
                      ([category, categoryItems], categoryIndex) => (
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
                  </div>
                )}
                {!isLoggedIn && openMenu === 'Your Store' && (
                  <div
                    className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}
                  >
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
                  </div>
                )}
                {openMenu === menuTitle && openMenu !== 'Your Store' && (
                  <div
                    className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}
                  >
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
                                categoryItem.specialClass || ''
                              }`}
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
                <a
                  className="nav-link navBarItem navBarItem-mobile"
                  onClick={e => {
                    navigate(item.url, e);
                  }}
                >
                  {item.label}
                </a>
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

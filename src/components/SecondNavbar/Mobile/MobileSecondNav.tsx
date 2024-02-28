import { FC, useState, SetStateAction, useContext } from "react";
import { AuthContext } from 'contexts/AuthContext';
import { menuData, navigationItems } from 'services/menuData-mobile';
import NavSearch from "../NavSearch";

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
  	const { isLoggedIn } = useContext(AuthContext);
	const [openMenu, setOpenMenu] = useState<menuTitle | null>(null);
	// TODO: Add real user image
  	const [imgSrc, setImgSrc] = useState('image_link');
	const handleNoImage = (e: { stopPropagation: () => void; }) => {
  	  e.stopPropagation();
  	  setImgSrc('/images/default-pfp.png');
  	};

	const handleMenuClick = (menuTitle: menuTitle) => {
		if (openMenu === menuTitle) {
			setOpenMenu(null); // Close the menu if it's already open
		} else {
			setOpenMenu(menuTitle); // Open the menu if it's closed
		}
	};

	const preventDefault = (event: { preventDefault: () => void }) => {
		event.preventDefault();
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
		}
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
                src={imgSrc}
                onError={handleNoImage}
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
                {/* TODO: render full your store links when logged in backend logic */}
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
                              href={categoryItem.url}
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
                      <a className="menuItem custom-label" href="#">
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
                              href={categoryItem.url}
                              onClick={preventDefault}
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
                  href={item.url}
                >
                  {item.label}
                </a>
              </li>
            </ul>
          </div>
        ))}
        <NavSearch />
      </nav>
    </div>
  );
};

export default MobileSecondNav;

import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { AuthContext } from 'contexts/AuthContext';
import { toast } from 'react-toastify';
import sharedData from '../sharedData';

interface MenuItem {
  id: string;
  text: string;
  link: string;
}

const SteamMenu: FC = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useContext(AuthContext);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const dropdownAnimation = useSpring({
    height: showNotificationDropdown ? 42 : 0,
    opacity: showNotificationDropdown ? 1 : 0,
    from: { height: 0, opacity: 0 },
  });

  const toggleSubmenu = (submenuId: string) => {
    if (openSubmenu === submenuId) {
      setOpenSubmenu(null);
      setOpenedItems(prevState => ({ ...prevState, [submenuId]: false }));
    } else {
      setOpenSubmenu(submenuId);
      setOpenedItems(prevState => ({ ...prevState, [submenuId]: true }));
    }
  };

  const generateMenuItems = (menuItems: MenuItem[], menuClass: string) => {
    return menuItems
      .map((menuItem, index) => {
        const submenu = sharedData.subMenus.find(
          subMenu => subMenu.title === menuItem.text,
        );
        const subMenuItemCount = submenu ? submenu.items.length : 0;

        const itemHeight = openedItems[menuItem.id]
          ? subMenuItemCount * 41.25
          : 0;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dropdownAnimation = useSpring({
          height: itemHeight,
          opacity: openedItems[menuItem.id] ? 1 : 0,
          from: { height: 0, opacity: 0 },
        });

        if (!isLoggedIn && menuItem.text === 'You & Friends') {
          return null;
        }

        return (
          <div
            className={`menu-item ${menuClass} ${
              menuItem.id === 'view-profile' ||
              menuItem.id === 'account-details' ||
              menuItem.id === 'store-preferences' ||
              menuItem.id === 'change-language' ||
              menuItem.id === 'change-user'
                ? 'has-dropdown'
                : ''
            } ${openedItems[menuItem.id] ? 'opened' : ''} ${
              index === 0 ? 'first' : ''
            }`}
            key={menuItem.id}
          >
            <div
              onClick={() => {
                if (
                  menuItem.id === 'support' ||
                  menuItem.id === 'account-details' ||
                  menuItem.id === 'store-preferences' ||
                  menuItem.id === 'change-language' ||
                  menuItem.id === 'change-user'
                ) {
                  navigate(menuItem.link);
                } else {
                  toggleSubmenu(menuItem.id);
                }
              }}
              className={`menu-item-content ${
                menuItem.id === 'supernav' ? 'supernav' : ''
              }`}
            >
              <span className="menu-item-text">{menuItem.text}</span>
              {menuItem.id === 'notifications' ||
              menuItem.id === 'store' ||
              menuItem.id === 'you-and-friends' ||
              menuItem.id === 'community' ? (
                <img
                  src="/images/dropdown.png"
                  alt="Rotate Icon"
                  className={`rotate-icon ${
                    openedItems[menuItem.id] ? 'rotated' : ''
                  }`}
                />
              ) : null}
            </div>
            {openedItems[menuItem.id] &&
              menuItem.id !== 'support' &&
              menuItem.id !== 'account-details' &&
              menuItem.id !== 'store-preferences' &&
              menuItem.id !== 'change-language' &&
              menuItem.id !== 'change-user' && (
                <animated.div
                  className={`submenu-wrapper inner-menu ${
                    menuItem.id === 'supernav' ? 'supernav-opened' : ''
                  }`}
                  style={{
                    height: dropdownAnimation.height,
                    opacity: dropdownAnimation.opacity,
                  }}
                >
                  {submenu?.items.map(subMenuItem => (
                    <a
                      className="submenuitem"
                      href={subMenuItem.link}
                      key={subMenuItem.id}
                    >
                      {subMenuItem.text}
                    </a>
                  ))}
                  {/* Display the count of submenu items */}
                  <p>Number of submenu items: {subMenuItemCount}</p>
                </animated.div>
              )}
          </div>
        );
      })
      .filter(Boolean);
  };

  const NotificationDropdown: FC = () => (
    <animated.div
      className={`menuitem_submenu_wrapper notification-dropdown ${
        showNotificationDropdown ? 'active' : ''
      }`}
      style={{
        height: dropdownAnimation.height,
        opacity: dropdownAnimation.opacity,
      }}
    >
      <div className="inner_borders">
        <div className="notification_submenu">
          <div data-featuretarget="green-envelope-responsive">
            <div className="NotificationHeader ResponsiveViewAll">
              <button
                className="AllNotificationsButton"
                onClick={() =>
                  toast.info(
                    `This feature is not implemented yet and may not be implemented in the future.`,
                  )
                }
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );

  // Render the SteamMenu component
  return (
    <div className="steam-menu">
      <div className="responsive_page_menu_ctn mainmenu">
        <div className="responsive_page_menu" id="responsive_page_menu">
          <div className="mainmenu_contents">
            <div className="mainmenu_contents_items">
              <div className="responsive_menu_user_area">
                <div className="responsive_menu_user_persona persona offline">
                  <div className="playerAvatar offline">
                    <a href={`/user/${userData?._id}/`}>
                      <img
                        src={
                          userData?.profilePicture || '/images/default-pfp.png'
                        }
                        alt="User Avatar"
                      />
                    </a>
                  </div>
                  <a
                    href={`/user/${userData?._id}/`}
                    data-miniprofile="216405522"
                  >
                    {userData?.username}
                  </a>
                </div>
                <div className="responsive_menu_cartwallet_area persona offline">
                  <div className="responsive_menu_user_cart">
                    <a href="/cart/">
                      Cart&nbsp;<b>({userData?.cart?.length || 0})</b>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={`menu-item supernav ${
                  showNotificationDropdown ? 'opened' : ''
                }`}
                onClick={() =>
                  setShowNotificationDropdown(!showNotificationDropdown)
                }
              >
                <div className="menu-item-content">
                  <span className="menu-item-text">Notifications</span>
                  <img
                    src="/images/dropdown.png"
                    alt="Rotate Icon"
                    className={`rotate-icon ${
                      showNotificationDropdown ? 'rotated' : ''
                    }`}
                  />
                  <div className="chevron"></div>
                </div>
                {showNotificationDropdown && <NotificationDropdown />}
              </div>
              {!isLoggedIn && (
                <div className="menu-item supernav">
                  <div
                    onClick={() => {
                      navigate('/login');
                    }}
                    className="menu-item-content"
                  >
                    <span className="menu-item-text">login</span>
                  </div>
                </div>
              )}
              {/* Generate menu items based on shared data */}
              {generateMenuItems(sharedData.menuItems, 'supernav')}
              {/* Generate minor menu items based on shared data */}
              {generateMenuItems(sharedData.minorMenuItems, 'smallnav')}
            </div>

            <div className="mainmenu_footer_spacer"></div>
            <div className="mainmenu_footer">
              <div className="mainmenu_footer_logo">
                <img
                  src="/images/logo_valve_footer.png"
                  alt="Valve Footer Logo"
                />
              </div>
              {/* Copyright and legal information */}
              This website is an educational project replicating the Steam site
              for learning purposes and is not affiliated with Valve
              Corporation.
              <br />
              <span className="mainmenu_valve_links">
                <a
                  href={sharedData.privacyPolicy.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sharedData.privacyPolicy.text}
                </a>
                &nbsp;|&nbsp;
                <a
                  href={sharedData.legal.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sharedData.legal.text}
                </a>
                &nbsp;|&nbsp;
                <a
                  href={sharedData.steamSubscriberAgreement.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sharedData.steamSubscriberAgreement.text}
                </a>
                &nbsp;|&nbsp;
                <a
                  href={sharedData.refunds.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sharedData.refunds.text}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SteamMenu component
export default SteamMenu;

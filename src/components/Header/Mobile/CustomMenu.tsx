'use client';

// React
import { useContext, useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// React spring
import { animated, useSpring } from 'react-spring';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Links Data
import sharedData from '../sharedData';

// Images
import defaultPFP from 'images/default-pfp.png';
import dropdown from 'images/dropdown.png';
import valveLogo from 'images/logo_valve_footer.png';

// Types
import type { FC } from 'react';
interface MenuItem {
  id: string;
  text: string;
  link: string;
}

const SteamMenu: FC = () => {
  // Initializations
  const router = useRouter();

  // Contexts
  const { userData, userPFP, isLoggedIn } = useContext(AuthContext);

  // States
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});
  const [showNotificationDropdown, setShowNotificationDropdown] = useState<boolean>(false);

  const dropdownAnimation = useSpring({
    height: showNotificationDropdown ? 42 : 0,
    opacity: showNotificationDropdown ? 1 : 0,
    from: { height: 0, opacity: 0 },
  });

  const toggleSubmenu = (submenuId: string) => {
    if (openSubmenu === submenuId) {
      setOpenSubmenu(null);
      setOpenedItems((prevState) => ({ ...prevState, [submenuId]: false }));
    } else {
      setOpenSubmenu(submenuId);
      setOpenedItems((prevState) => ({ ...prevState, [submenuId]: true }));
    }
  };

  const handleMenuItemClick = (menuItem: MenuItem) => {
    if (
      menuItem.id === 'support' ||
      menuItem.id === 'account-details' ||
      menuItem.id === 'store-preferences' ||
      menuItem.id === 'change-language' ||
      menuItem.id === 'change-user'
    ) {
      router.push(menuItem.link);
    } else {
      toggleSubmenu(menuItem.id);
    }
  };

  const generateMenuItems = (menuItems: MenuItem[], menuClass: string) => {
    return menuItems
      .map((menuItem, index) => {
        const submenu = sharedData.subMenus.find((subMenu) => subMenu.title === menuItem.text);
        const subMenuItemCount = submenu ? submenu.items.length : 0;

        const itemHeight = openedItems[menuItem.id] ? subMenuItemCount * 41.25 : 0;

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
            } ${openedItems[menuItem.id] ? 'opened' : ''} ${index === 0 ? 'first' : ''}`}
            key={menuItem.id}
          >
            <div
              onClick={() => handleMenuItemClick(menuItem)}
              className={`menu-item-content ${menuItem.id === 'supernav' ? 'supernav' : ''}`}
            >
              <span className="menu-item-text">{menuItem.text}</span>
              {menuItem.id === 'notifications' ||
              menuItem.id === 'store' ||
              menuItem.id === 'you-and-friends' ||
              menuItem.id === 'community' ? (
                <img
                  src={dropdown.src}
                  alt="Rotate Icon"
                  className={`rotate-icon ${openedItems[menuItem.id] ? 'rotated' : ''}`}
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
                  {submenu?.items.map((subMenuItem) => (
                    <Link className="submenuitem" href={subMenuItem.link} key={subMenuItem.id}>
                      {subMenuItem.text}
                    </Link>
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
              <button className="AllNotificationsButton" onClick={() => toast.info(`Coming soon.`)}>
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );

  const handleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleLogin = () => {
    router.push('/login');
  };

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
                    <Link href={`/user/${userData?.id}/`}>
                      <img src={userPFP || defaultPFP.src} alt="User Avatar" />
                    </Link>
                  </div>
                  <Link href={`/user/${userData?.id}/`}>{userData?.username}</Link>
                </div>
                <div className="responsive_menu_cartwallet_area persona offline">
                  <div className="responsive_menu_user_cart">
                    <Link href="/cart">
                      Cart&nbsp;<b>({userData?.cart?.length || 0})</b>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={`menu-item supernav ${showNotificationDropdown ? 'opened' : ''}`}
                onClick={handleNotificationDropdown}
              >
                <div className="menu-item-content">
                  <span className="menu-item-text">Notifications</span>
                  <img
                    src={dropdown.src}
                    alt="Rotate Icon"
                    className={`rotate-icon ${showNotificationDropdown ? 'rotated' : ''}`}
                  />
                  <div className="chevron"></div>
                </div>
                {showNotificationDropdown && <NotificationDropdown />}
              </div>
              {!isLoggedIn && (
                <div className="menu-item supernav">
                  <div onClick={handleLogin} className="menu-item-content">
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
                <Image src={valveLogo} alt="Valve Footer Logo" />
              </div>
              {/* Copyright and legal information */}
              This website is an educational project replicating the Steam site for learning
              purposes and is not affiliated with Valve Corporation.
              <br />
              <span className="mainmenu_valve_links">
                <Link
                  href={sharedData.privacyPolicy.link}
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  {sharedData.privacyPolicy.text}
                </Link>
                &nbsp;|&nbsp;
                <Link href={sharedData.legal.link} target="_blank" rel="noreferrer noopenner">
                  {sharedData.legal.text}
                </Link>
                &nbsp;|&nbsp;
                <Link
                  href={sharedData.steamSubscriberAgreement.link}
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  {sharedData.steamSubscriberAgreement.text}
                </Link>
                &nbsp;|&nbsp;
                <Link href={sharedData.refunds.link} target="_blank" rel="noreferrer noopenner">
                  {sharedData.refunds.text}
                </Link>
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

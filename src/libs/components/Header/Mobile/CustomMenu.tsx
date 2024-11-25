// React
import { useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Links Data
import sharedData from '../sharedData';

// Components
import MenuDropdownItems from './MenuDropdownItems';
import NotificationDropdown from './NotificationDropdown';

// Images
import defaultPFP from '@images/default-pfp.png';
import dropdown from '@images/dropdown.png';
import valveLogo from '@images/logo_valve_footer.png';

export default function SteamMenu() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { currentUserData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState<boolean>(false);

  //--------------------------- Event Handlers ----------------------------//
  const handleNotificationDropdown = (): void => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleLogin = (): void => {
    router.push('/login');
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="steam-menu">
      <div className="responsive_page_menu_ctn mainmenu">
        <div className="responsive_page_menu" id="responsive_page_menu">
          <div className="mainmenu_contents">
            <div className="mainmenu_contents_items">
              <div className="responsive_menu_user_area">
                <div className="responsive_menu_user_persona persona offline">
                  <div className="playerAvatar offline">
                    <Link href={`/user/${currentUserData?.id}/`}>
                      <img
                        src={currentUserData?.profilePicture ?? defaultPFP.src}
                        alt="User Avatar"
                      />
                    </Link>
                  </div>
                  <Link href={`/user/${currentUserData?.id}/`}>{currentUserData?.username}</Link>
                </div>

                <div className="responsive_menu_cartwallet_area persona offline">
                  <div className="responsive_menu_user_cart">
                    <Link href="/cart">
                      Cart&nbsp;<b>({currentUserData?.cart?.length ?? 0})</b>
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
                  <div className="chevron" />
                </div>
                <NotificationDropdown showNotificationDropdown={showNotificationDropdown} />
              </div>

              {!isUserLoggedIn && (
                <div className="menu-item supernav">
                  <div onClick={handleLogin} className="menu-item-content">
                    <span className="menu-item-text">login</span>
                  </div>
                </div>
              )}

              <MenuDropdownItems menuItems={sharedData.menuItems} menuClass={'supernav'} />
              <MenuDropdownItems menuItems={sharedData.minorMenuItems} menuClass={'smallnav'} />
            </div>

            <div className="mainmenu_footer_spacer" />

            <div className="mainmenu_footer">
              <div className="mainmenu_footer_logo">
                <Image src={valveLogo} alt="Valve Footer Logo" />
              </div>
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
}

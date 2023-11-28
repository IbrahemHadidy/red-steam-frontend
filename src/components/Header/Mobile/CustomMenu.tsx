import React, { useState } from "react";
import sharedData from "../sharedData";

interface MenuItem {
  id: string;
  text: string;
  link: string;
}

interface SteamMenuProps {}

const SteamMenu: React.FC<SteamMenuProps> = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const toggleSubmenu = (submenuId: string) => {
    if (openSubmenu === submenuId) {
      setOpenSubmenu(null);
      setOpenedItems((prevState) => ({ ...prevState, [submenuId]: false }));
    } else {
      setOpenSubmenu(submenuId);
      setOpenedItems((prevState) => ({ ...prevState, [submenuId]: true }));
    }
  };

  const generateMenuItems = (menuItems: MenuItem[], menuClass: string) => {
    return menuItems.map((menuItem) => (
      <div
        className={`menu-item ${menuClass} ${
          menuItem.id === "account-details" ||
          menuItem.id === "store-preferences" ||
          menuItem.id === "change-language" ||
          menuItem.id === "change-user"
            ? "has-dropdown"
            : ""
        } ${openedItems[menuItem.id] ? "opened" : ""}`}
        data-submenu={`submenu-${menuItem.id}`}
        key={menuItem.id}
      >
        <div
          onClick={() => {
            if (
              menuItem.id === "support" ||
              menuItem.id === "account-details" ||
              menuItem.id === "store-preferences" ||
              menuItem.id === "change-language" ||
              menuItem.id === "change-user"
            ) {
              window.location.href = menuItem.link;
            } else {
              toggleSubmenu(menuItem.id);
            }
          }}
          className={`menu-item-content ${
            menuItem.id === "supernav" ? "supernav" : ""
          }`}
        >
          <span className="menu-item-text">{menuItem.text}</span>
          {menuItem.id === "notifications" ||
          menuItem.id === "store" ||
          menuItem.id === "you-and-friends" ||
          menuItem.id === "community" ? (
            <img
              src="/images/dropdown.png"
              alt="Rotate Icon"
              className={`rotate-icon ${
                openedItems[menuItem.id] ? "rotated" : ""
              }`}
            />
          ) : null}
          <div className="chevron"></div>
        </div>
        {openedItems[menuItem.id] &&
          menuItem.id !== "support" &&
          menuItem.id !== "account-details" &&
          menuItem.id !== "store-preferences" &&
          menuItem.id !== "change-language" &&
          menuItem.id !== "change-user" && (
            <div
              className={`submenu-wrapper inner-menu ${
                menuItem.id === "supernav" ? "supernav-opened" : ""
              }`}
            >
              {sharedData.subMenus
                .find((subMenu) => subMenu.title === menuItem.text)
                ?.items.map((subMenuItem) => (
                  <a
                    className="submenuitem"
                    href={subMenuItem.link}
                    key={subMenuItem.id}
                  >
                    {subMenuItem.text}
                  </a>
                ))}
            </div>
          )}
      </div>
    ));
  };

  const NotificationDropdown: React.FC = () => (
    <div
      className={`menuitem_submenu_wrapper notification-dropdown ${
        showNotificationDropdown ? "active" : ""
      }`}
      style={{ height: "42px" }}
    >
      <div className="inner_borders">
        <div className="notification_submenu" data-submenuid="notifications">
          <div data-featuretarget="green-envelope-responsive">
            <div className="NotificationHeader ResponsiveViewAll">
              <button className="AllNotificationsButton">View All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the SteamMenu component
  return (
    <div className="steam-menu">
      <div className="responsive_page_menu_ctn mainmenu">
        <div className="responsive_page_menu" id="responsive_page_menu">
          <div className="mainmenu_contents">
            <div className="mainmenu_contents_items">
              <div className="responsive_menu_user_area">
                {/* User persona and profile link */}
                <div className="responsive_menu_user_persona persona offline">
                  <div className="playerAvatar offline">
                    <a href="https://steamcommunity.com/id/iTankDestroyer/">
                      <img
                        src="https://source.unsplash.com/user/c_v_r"
                        alt="User Avatar"
                      />
                    </a>
                  </div>
                  <a
                    href="https://steamcommunity.com/id/iTankDestroyer/"
                    data-miniprofile="216405522"
                  >
                    Profile
                  </a>
                </div>

                {/* User cart and cart link */}
                <div className="responsive_menu_cartwallet_area persona offline">
                  <div className="responsive_menu_user_cart">
                    <a href="https://store.steampowered.com/cart/">
                      Cart&nbsp;<b>(0)</b>
                    </a>
                  </div>
                </div>
              </div>

              {/* Notifications menu item with a dropdown */}
              <div
                className={`menu-item supernav ${
                  showNotificationDropdown ? "opened" : ""
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
                      showNotificationDropdown ? "rotated" : ""
                    }`}
                  />
                  <div className="chevron"></div>
                </div>
                {showNotificationDropdown && <NotificationDropdown />}
              </div>

              {/* Generate menu items based on shared data */}
              {generateMenuItems(sharedData.menuItems, "supernav")}

              {/* Generate minor menu items based on shared data */}
              {generateMenuItems(sharedData.minorMenuItems, "smallnav")}
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

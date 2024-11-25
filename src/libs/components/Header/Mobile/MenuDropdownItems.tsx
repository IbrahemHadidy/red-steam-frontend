// React
import { useCallback, useState } from 'react';

// Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Links Data
import sharedData from '../sharedData';

// Images
import dropdown from '@images/dropdown.png';

type MenuItem = {
  id: string;
  text: string;
  link: string;
};

type SubMenu = {
  title: string;
  items: MenuItem[];
};

interface MenuDropdownItemsProps {
  menuItems: MenuItem[];
  menuClass: 'supernav' | 'smallnav';
}

export default function MenuDropdownItems({ menuItems, menuClass }: MenuDropdownItemsProps) {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  //------------------------------- States --------------------------------//
  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});

  //--------------------------- Utility Functions -------------------------//
  const getSubmenu = useCallback(
    (menuItem: MenuItem): SubMenu | undefined =>
      sharedData.subMenus.find((subMenu) => subMenu.title === menuItem.text),
    []
  );

  const toggleSubmenu = useCallback((submenuId: string) => {
    setOpenedItems((prevState) => ({
      ...prevState,
      [submenuId]: !prevState[submenuId],
    }));
  }, []);

  const handleMenuItemClick = useCallback(
    (menuItem: MenuItem) => {
      const navigableIds = ['store', 'profile-settings', 'store-preferences', 'change-user'];
      if (navigableIds.includes(menuItem.id)) {
        router.push(menuItem.link);
      } else {
        toggleSubmenu(menuItem.id);
      }
    },
    [router, toggleSubmenu]
  );

  //------------------------------- Render --------------------------------//
  return menuItems
    .map((menuItem, idx) => {
      const submenu = getSubmenu(menuItem);
      const subMenuItemCount = submenu?.items.length || 0;

      if (!isUserLoggedIn && menuItem.text === 'You & Friends') return null;

      const isOpened = openedItems[menuItem.id];
      const totalHeight = isOpened ? subMenuItemCount * 41.25 : 0;
      const hasDropdownIcon = ['notifications', 'profile', 'admin'].includes(menuItem.id);

      return (
        <div
          className={`menu-item ${menuClass} ${
            isOpened ? 'opened' : ''
          } ${idx === 0 ? 'first' : ''}`}
          key={menuItem.id}
        >
          <div
            onClick={() => handleMenuItemClick(menuItem)}
            className={`menu-item-content ${menuItem.id === 'supernav' ? 'supernav' : ''}`}
          >
            <span className="menu-item-text">{menuItem.text}</span>
            {hasDropdownIcon && (
              <img
                src={dropdown.src}
                alt="Rotate Icon"
                className={`rotate-icon ${isOpened ? 'rotated' : ''}`}
              />
            )}
          </div>

          {submenu && (
            <div
              className={`submenu-wrapper inner-menu ${
                menuItem.id === 'supernav' ? 'supernav-opened' : ''
              }`}
              style={{
                height: totalHeight + 'px',
              }}
            >
              {submenu.items.map((subMenuItem) => (
                <Link className="submenuitem" href={subMenuItem.link} key={subMenuItem.id}>
                  {subMenuItem.text}
                </Link>
              ))}
              <p>Number of submenu items: {subMenuItemCount}</p>
            </div>
          )}
        </div>
      );
    })
    .filter(Boolean);
}

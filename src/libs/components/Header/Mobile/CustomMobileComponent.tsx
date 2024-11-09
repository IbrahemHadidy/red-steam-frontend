'use client';

// React
import { useCallback, useEffect, useRef, useState } from 'react';

// Components
import SteamMenu from './CustomMenu';
import MiniHeader from './MiniHeader';

// Types
import { MouseEvent } from 'react';

export default function CustomMobileComponent() {
  //--------------------------- State Selectors ---------------------------//
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // Refs
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = (): void => {
    setShowMenu(false);
  };

  const handleClickOutside = useCallback(
    (e: Event): void => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Click occurred outside the menu, so close it
        closeMenu();
      }
    },
    [showMenu, menuRef]
  );

  useEffect(() => {
    // Add or remove the click event listener based on the menu state
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto'; // Allow scrolling
    }

    return () => {
      // Clean up the event listener and reset overflow property when the component unmounts
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [handleClickOutside, showMenu]);

  return (
    <>
      <MiniHeader onMenuClick={toggleMenu} />
      {/* Overlay to fade away when the menu is open */}
      <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={closeMenu}></div>
      {/* Container for the menu */}
      <div className={`steam-menu-container ${showMenu ? 'show' : ''}`} ref={menuRef}>
        <SteamMenu />
      </div>
    </>
  );
}

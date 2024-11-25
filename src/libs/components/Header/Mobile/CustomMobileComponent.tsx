'use client';

// React
import { useCallback, useEffect, useRef, useState } from 'react';

// Components
import SteamMenu from './CustomMenu';
import MiniHeader from './MiniHeader';

// Types
import { MouseEvent } from 'react';

export default function CustomMobileComponent() {
  //------------------------------- States --------------------------------//
  const [showMenu, setShowMenu] = useState<boolean>(false);

  //-------------------------------- Refs ---------------------------------//
  const menuRef = useRef<HTMLDivElement | null>(null);

  //--------------------------- Event Hanlders ----------------------------//
  const toggleMenu = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = (): void => {
    setShowMenu(false);
  };

  const handleClickOutside = useCallback(
    (e: Event): void => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu();
    },
    [showMenu, menuRef]
  );

  //--------------------------------- Effects -------------------------------//
  // Handle click outside of the menu and prevent scrolling
  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto'; // Allow scrolling
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [handleClickOutside, showMenu]);

  //---------------------------------- Render -------------------------------//
  return (
    <>
      <MiniHeader onMenuClick={toggleMenu} />
      <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={closeMenu}></div>
      <div className={`steam-menu-container ${showMenu ? 'show' : ''}`} ref={menuRef}>
        <SteamMenu />
      </div>
    </>
  );
}

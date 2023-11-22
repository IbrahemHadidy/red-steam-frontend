// CustomMobileComponent.jsx
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import SteamMenu from "./CustomMenu";
import MiniHeader from "./MiniHeader";

const CustomMobileComponent: React.FC = () => {
  const [showAnotherComponent, setShowAnotherComponent] =
    useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleAnotherComponent = (event: MouseEvent) => {
    event.stopPropagation(); // Prevent event propagation
    setShowAnotherComponent(!showAnotherComponent);
  };

  const closeMenu = () => {
    setShowAnotherComponent(false);
  };

  const handleClickOutside = (event: Event) => {
    if (
      showAnotherComponent &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      // Click occurred outside the menu, so close it
      closeMenu();
    }
  };

  useEffect(() => {
    // Add or remove the click event listener based on the menu state
    if (showAnotherComponent) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto"; // Allow scrolling
    }

    return () => {
      // Clean up the event listener and reset overflow property when the component unmounts
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showAnotherComponent]);

  return (
    <>
      <MiniHeader onMenuClick={toggleAnotherComponent} />
      <div
        className={`overlay ${showAnotherComponent ? "show" : ""}`}
        onClick={closeMenu} // Handle click to fade away the overlay
      ></div>
      <div className={`steam-menu-container ${showAnotherComponent ? "show" : ""}`} ref={menuRef}>
        <SteamMenu />
      </div>
    </>
  );
};

export default CustomMobileComponent;

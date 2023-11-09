import React, { useState, useEffect, useRef, MouseEvent } from "react";
import SteamMenu from "./CustomMenu";
import MiniHeader from "./MiniHeader";

const CustomMobileComponent: React.FC = () => {
  const [showAnotherComponent, setShowAnotherComponent] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleAnotherComponent = (event: MouseEvent) => {
    event.stopPropagation(); // Prevent event propagation
    setShowAnotherComponent(!showAnotherComponent);
  };

  const closeMenu = (event: MouseEvent | Event) => {
    event.stopPropagation(); // Prevent event propagation
    setShowAnotherComponent(false);
  };

  const handleClickOutside = (event: Event) => {
    console.log("Handling click outside"); // Add a log statement
    if (
      showAnotherComponent &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      // Click occurred outside the menu, so close it
      closeMenu(event);
    }
  };

  useEffect(() => {
    console.log("useEffect called"); // Add a log statement
    // Add or remove the click event listener based on the menu state
    if (showAnotherComponent) {
      console.log("Adding click event listener");
      document.addEventListener("click", handleClickOutside);
    } else {
      console.log("Removing click event listener");
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      console.log("Cleaning up useEffect"); // Add a log statement
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <>
      <MiniHeader onMenuClick={toggleAnotherComponent} />
      {showAnotherComponent && (
        <>
          <div ref={menuRef}>
            <SteamMenu />
          </div>
          <div className="overlay" onClick={closeMenu}></div>
        </>
      )}
    </>
  );
};

export default CustomMobileComponent;

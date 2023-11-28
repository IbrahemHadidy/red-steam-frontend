import React, { MouseEvent } from "react";

interface MiniHeaderProps {
  onMenuClick: (event: MouseEvent) => void;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="header-mobile">
      <div>
        <div
          id="headermenu-mobile"
          onClick={onMenuClick} // Trigger the click event to show the other component
        >
          <img
            src="/images/header_menu_hamburger.png"
            height="100%"
            alt="header menu"
          />
          <div className="header-notification">
            <div className="notification-number no-notification">
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="mobile-logo">
          <a href="/">
            <img
              src="/images/header_logo.png"
              height="36"
              alt="header logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;

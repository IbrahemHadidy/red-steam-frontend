'use client';

// Next.js
import Image from 'next/image';
import Link from 'next/link';

// Images
import headerLogo from 'images/header_logo.png';
import headerHumburger from 'images/header_menu_hamburger.png';

// Types
import type { FC, MouseEvent as ReactMouseEvent } from 'react';
interface MiniHeaderProps {
  onMenuClick: (event: ReactMouseEvent<HTMLDivElement>) => void;
}

const MiniHeader: FC<MiniHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="header-mobile">
      <div>
        <div id="headermenu-mobile" onClick={onMenuClick}>
          <img src={headerHumburger.src} style={{ height: '100%' }} alt="header menu" />
          <div className="header-notification">
            <div className="notification-number no-notification">
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="mobile-logo">
          <Link href="/">
            <Image src={headerLogo} height="36" alt="header logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;

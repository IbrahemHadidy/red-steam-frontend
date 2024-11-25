'use client';

// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Bootstrap Components
import { NavDropdown } from 'react-bootstrap';

// Links Data
import sharedData from '../sharedData';

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import type { MouseEvent } from 'react';

export default function ProfileDropdown() {
  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  //--------------------------- Event Handlers ----------------------------//
  const handleDropdownToggle = (e: MouseEvent<HTMLElement>, eventKey: string): void => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => (eventKey === prevIsOpen ? null : eventKey));
  };

  //------------------------------- Render -------------------------------//
  return (
    <>
      <NavDropdown
        title="profile"
        id={'4'}
        className="profile-dropdown"
        renderMenuOnMount
        onClick={(e) => {
          handleDropdownToggle(e, '4');
        }}
        show={isOpen === '4'}
        key={'4'}
      >
        {sharedData.minorMenuItems
          .map((item) => item.link)
          .map((link, idx) => (
            <Link className="dropdown-item" href={link} key={idx}>
              {sharedData.minorMenuItems.map((item) => item.text)[idx]}
            </Link>
          ))}
      </NavDropdown>

      <Link href="/user/settings" className="compact-profile-link">
        <img
          src={currentUserData?.profilePicture ?? defaultPFP.src}
          alt="Profile"
          width="40"
          height="40"
          className={`profile-pic ${currentUserData?.profilePicture ? '' : 'no-pfp'}`}
        />
      </Link>
    </>
  );
}

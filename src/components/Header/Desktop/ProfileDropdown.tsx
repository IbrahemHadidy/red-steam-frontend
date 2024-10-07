'use client';

// React
import { useState } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Bootstrap Components
import { NavDropdown } from 'react-bootstrap';

// Links Data
import sharedData from '../sharedData';

// Images
import defaultPFP from '@images/default-pfp.png';
import Link from 'next/link';

// Types
import type { JSX, MouseEvent } from 'react';

export default function ProfileDropdown(): JSX.Element {
  // Init
  const router = useRouter();

  // States
  const { userData } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (e: MouseEvent<HTMLElement>, eventKey: string): void => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => (eventKey === prevIsOpen ? null : eventKey));
  };

  const handleDropdownItemClick = (link: string): void => {
    router.push(link);
  };

  const renderNavDropdownWithClick = (
    title: string,
    renderKey: string,
    links: string[],
    items: string[]
  ): JSX.Element => {
    return (
      <NavDropdown
        title={title}
        id={renderKey}
        className="profile-dropdown"
        renderMenuOnMount
        onClick={(e) => {
          handleDropdownToggle(e, renderKey);
        }}
        show={isOpen === renderKey}
        key={renderKey}
      >
        {links.map((link, idx) => (
          <NavDropdown.Item href="#" key={idx} onClick={() => handleDropdownItemClick(link)}>
            {items[idx]}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  return (
    <>
      {renderNavDropdownWithClick(
        userData?.username || 'profile',
        '4',
        sharedData.minorMenuItems.map((item) => item.link),
        sharedData.minorMenuItems.map((item) => item.text)
      )}
      <Link href="/user/settings" className="compact-profile-link">
        <img
          src={userData?.profilePicture || defaultPFP.src}
          alt="Profile"
          width="40"
          height="40"
          className={`profile-pic ${userData?.profilePicture ? '' : 'no-pfp'}`}
        />
      </Link>
    </>
  );
}

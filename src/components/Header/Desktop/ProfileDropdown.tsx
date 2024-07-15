'use client';

// React
import { useContext, useState } from 'react';

// Next.js
import { useRouter } from 'next/navigation';

// Bootstrap Components
import { NavDropdown } from 'react-bootstrap';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Links Data
import sharedData from '../sharedData';

// Images
import defaultPFP from 'images/default-pfp.png';
import Link from 'next/link';

// Types
import type { FC, MouseEvent as ReactMouseEvent } from 'react';

const ProfileDropdown: FC = () => {
  // Initializations
  const router = useRouter();

  // Contexts
  const { userData, userPFP } = useContext(AuthContext);

  // States
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (e: ReactMouseEvent<HTMLElement>, eventKey: string) => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => (eventKey === prevIsOpen ? null : eventKey));
  };

  const handleDropdownItemClick = (link: string) => {
    router.push(link);
  };

  const renderNavDropdownWithClick = (
    title: string,
    renderKey: string,
    links: string[],
    items: string[]
  ) => {
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
        {links.map((link, index) => (
          <NavDropdown.Item href="#" key={index} onClick={() => handleDropdownItemClick(link)}>
            {items[index]}
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
      <Link
        href="user/settings"
        target="_blank"
        rel="noreferrer noopenner"
        className="compact-profile-link"
      >
        <img
          src={userPFP || defaultPFP.src}
          alt="Profile"
          width="40"
          height="40"
          className={`profile-pic ${userData?.profilePicture ? '' : 'no-pfp'}`}
        />
      </Link>
    </>
  );
};

export default ProfileDropdown;

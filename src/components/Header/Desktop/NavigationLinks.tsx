'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Bootstrap Components
import { Nav, NavDropdown } from 'react-bootstrap';

// Links data
import sharedData from '../sharedData';

// Types
import type { JSX, MouseEvent } from 'react';

export default function NavigationLinks(): JSX.Element {
  // Init
  const router = useRouter();
  const pathname = usePathname();

  // Contexts
  const { isLoggedIn, userData } = useContext(AuthContext);

  // States
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleDropdownToggle = (e: MouseEvent, eventKey: number): void => {
    e.preventDefault();
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  const renderNavDropdownWithHover = (
    title: string,
    renderKey: number,
    items: { link: string; text: string }[]
  ): JSX.Element => {
    const isUserActive: boolean = pathname?.includes('/user') && !pathname?.includes('/admin');
    const dropdownUserClassName: string = isUserActive ? 'active-title' : '';
    const isAdminActive: boolean = pathname?.startsWith('/admin');
    const dropdownAdminClassName: string = isAdminActive ? 'active-title' : '';

    return (
      <NavDropdown
        title={
          <span
            className={`main-dropdowns ${title.includes('Profile') || title.includes(userData?.username as string) ? dropdownUserClassName : ''} ${title.includes('Admin') ? dropdownAdminClassName : ''}`}
          >
            {title}
          </span>
        }
        id={renderKey.toString()}
        className="main-dropdowns"
        renderMenuOnMount
        onMouseEnter={(e) => handleDropdownToggle(e, renderKey)}
        onMouseLeave={(e) => handleDropdownToggle(e, renderKey)}
        show={isOpen === renderKey}
        key={renderKey}
      >
        {items.map((item, idx) => (
          <Link key={idx} href={item.link} className="dropdown-item">
            {item.text}
          </Link>
        ))}
      </NavDropdown>
    );
  };

  const isStoreActive: boolean =
    !pathname?.includes('/notfound') &&
    !pathname?.includes('/library') &&
    !pathname?.includes('/admin') &&
    !pathname?.includes('/user');

  const dropdownStoreClassName: string = isStoreActive ? 'active-title' : '';

  const isLibraryActive: boolean = pathname?.startsWith('/library');
  const dropdownLibraryClassName: string = isLibraryActive ? 'active-title' : '';

  useEffect(() => {
    setIsOpen(null);
  }, [router]);

  return (
    <Nav>
      <Nav.Link href="/" className={`main-dropdowns  ${dropdownStoreClassName}`}>
        Store
      </Nav.Link>
      {isLoggedIn && userData?.isAdmin && (
        <>{renderNavDropdownWithHover('Admin', 1, sharedData.subMenus[1].items)}</>
      )}
      {isLoggedIn && (
        <Nav.Link href="/library" className={`main-dropdowns  ${dropdownLibraryClassName}`}>
          Library
        </Nav.Link>
      )}
      {isLoggedIn &&
        renderNavDropdownWithHover(
          `${userData?.username ? userData.username : 'Profile'}`,
          2,
          sharedData.subMenus[0].items
        )}
      <Nav.Link
        href="https://github.com/IbrahemHadidy/red-steam/issues"
        target="_blank"
        rel="noreferrer noopenner"
        className="main-dropdowns"
      >
        report an issue
      </Nav.Link>
    </Nav>
  );
}

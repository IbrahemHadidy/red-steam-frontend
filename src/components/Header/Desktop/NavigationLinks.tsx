'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Bootstrap Components
import { Nav, NavDropdown } from 'react-bootstrap';

// Links data
import sharedData from '../sharedData';

// Types
import type { FC, JSX, MouseEvent } from 'react';

const NavigationLinks: FC = (): JSX.Element => {
  // Init
  const router = useRouter();
  const pathname = usePathname();

  // Contexts
  const { isLoggedIn, userData } = useContext(AuthContext);

  // States
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (e: MouseEvent, eventKey: string): void => {
    e.preventDefault();
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  const handleDropdownClick = (e: MouseEvent, link: string): void => {
    e.preventDefault();
    setIsOpen(null);
    router.push(link);
  };

  const renderNavDropdownWithHover = (
    title: string,
    renderKey: string,
    mainLink: string,
    items: { link: string; text: string }[]
  ): JSX.Element => {
    const isStoreActive: boolean =
      !pathname?.includes('/notfound') &&
      !pathname?.includes('/library') &&
      !pathname?.includes('/admin') &&
      !pathname?.includes('/user');

    const dropdownStoreClassName: string = isStoreActive ? 'active-title' : '';

    const isUserActive: boolean = pathname?.includes('/user');
    const dropdownUserClassName: string = isUserActive ? 'active-title' : '';
    const isAdminActive: boolean = pathname?.startsWith('/admin');
    const dropdownAdminClassName: string = isAdminActive ? 'active-title' : '';

    return (
      <NavDropdown
        title={
          <span
            className={`main-dropdowns ${title === 'STORE' ? dropdownStoreClassName : ''} ${title.includes('Profile') || title.includes(userData?.username as string) ? dropdownUserClassName : ''} ${title.includes('Admin') ? dropdownAdminClassName : ''}`}
          >
            {title}
          </span>
        }
        id={renderKey}
        className="main-dropdowns"
        renderMenuOnMount
        onMouseEnter={(e) => handleDropdownToggle(e, renderKey)}
        onMouseLeave={(e) => handleDropdownToggle(e, renderKey)}
        show={isOpen === renderKey}
        key={renderKey}
        onClick={(e) => handleDropdownClick(e, mainLink)}
      >
        {items.map((item, idx) => (
          <NavDropdown.Item key={idx} href={item.link}>
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  const isLibraryActive: boolean = pathname?.startsWith('/library');
  const dropdownLibraryClassName: string = isLibraryActive ? 'active-title' : '';

  useEffect(() => {
    setIsOpen(null);
  }, [router]);

  const handleLibraryNavigation = (e: MouseEvent): void => {
    e.preventDefault();
    router.push('/library');
  };

  return (
    <Nav>
      {renderNavDropdownWithHover('STORE', '1', '/', sharedData.subMenus[0].items)}
      {isLoggedIn && userData?.isAdmin && (
        <>
          {renderNavDropdownWithHover(
            'Admin',
            '2',
            '/admin/create-game',
            sharedData.subMenus[2].items
          )}
        </>
      )}
      {isLoggedIn && (
        <Nav.Link
          onClick={handleLibraryNavigation}
          className={`main-dropdowns  ${dropdownLibraryClassName}`}
        >
          Library
        </Nav.Link>
      )}
      {isLoggedIn &&
        renderNavDropdownWithHover(
          `${userData?.username ? userData.username : 'Profile'}`,
          '3',
          '/user',
          sharedData.subMenus[1].items
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
};

export default NavigationLinks;

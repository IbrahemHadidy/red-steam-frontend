'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// Next.js
import { usePathname, useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Bootstrap Components
import { Nav, NavDropdown } from 'react-bootstrap';

// Links data
import sharedData from '../sharedData';

const NavigationLinks: FC = () => {
  // Initializations
  const router = useRouter();
  const pathname = usePathname();

  // Contexts
  const { isLoggedIn, userData } = useContext(AuthContext);

  // States
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (eventKey: string) => {
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  const handleDropdownClick = (link: string) => {
    setIsOpen(null);
    router.push(link);
  };

  const renderNavDropdownWithHover = (
    title: string,
    renderKey: string,
    mainLink: string,
    items: { link: string; text: string }[]
  ) => {
    const isStoreActive =
      pathname?.startsWith(mainLink) &&
      !pathname?.startsWith('/user') &&
      !pathname?.startsWith('/notfound') &&
      !pathname?.startsWith('/library') &&
      !pathname?.startsWith('/admin');
    const dropdownStoreClassName = isStoreActive ? 'active-title' : '';

    const isUserActive = pathname?.startsWith('/user');
    const dropdownUserClassName = isUserActive ? 'active-title' : '';

    return (
      <NavDropdown
        title={
          <span
            className={`main-dropdowns ${title === 'STORE' ? dropdownStoreClassName : dropdownUserClassName}`}
          >
            {title}
          </span>
        }
        id={renderKey}
        className="main-dropdowns"
        renderMenuOnMount
        onMouseEnter={() => handleDropdownToggle(renderKey)}
        onMouseLeave={() => handleDropdownToggle(renderKey)}
        show={isOpen === renderKey}
        key={renderKey}
        onClick={() => handleDropdownClick(mainLink)}
      >
        {items.map((item, index) => (
          <NavDropdown.Item key={index} href={item.link}>
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  const isAdminActive = pathname?.startsWith('/admin');
  const dropdownAdminClassName = isAdminActive ? 'active-title' : '';
  const isLibraryActive = pathname?.startsWith('/library');
  const dropdownLibraryClassName = isLibraryActive ? 'active-title' : '';

  useEffect(() => {
    setIsOpen(null);
  }, [router]);

  const handleAdminNavigation = () => {
    router.push('/admin');
  };

  const handleLibraryNavigation = () => {
    router.push('/library');
  };

  return (
    <Nav>
      {renderNavDropdownWithHover('STORE', '1', '/', sharedData.subMenus[0].items)}
      {isLoggedIn && userData?.isAdmin && (
        <Nav.Link
          href="/admin"
          onClick={handleAdminNavigation}
          className={`main-dropdowns  ${dropdownAdminClassName}`}
        >
          Admin
        </Nav.Link>
      )}
      {isLoggedIn && (
        <Nav.Link
          href="/library"
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

// NextJS
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useRenderNavDropdownWithHover from './hooks/useRenderNavDropdownWithHover';

// Bootstrap Components
import { Nav } from 'react-bootstrap';

// Links data
import sharedData from '../sharedData';

export default function NavigationLinks() {
  //--------------------------- Initializations ---------------------------//
  const pathname = usePathname();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, currentUserData } = useAppSelector((state) => state.auth);

  const isStoreActive =
    !pathname?.includes('/notfound') &&
    !pathname?.includes('/library') &&
    !pathname?.includes('/admin') &&
    !pathname?.includes('/user');

  const dropdownStoreClassName = isStoreActive ? 'active-title' : '';
  const isLibraryActive = pathname?.startsWith('/library');
  const dropdownLibraryClassName = isLibraryActive ? 'active-title' : '';

  //------------------------------- Render --------------------------------//
  const adminDropdown = useRenderNavDropdownWithHover(
    pathname,
    'Admin',
    1,
    sharedData.subMenus[1].items
  );

  const profileDropdown = useRenderNavDropdownWithHover(
    pathname,
    `${currentUserData?.username ? currentUserData.username : 'Profile'}`,
    2,
    sharedData.subMenus[0].items
  );

  return (
    <Nav>
      <Link href="/" className={`main-dropdowns nav-link ${dropdownStoreClassName}`}>
        Store
      </Link>

      {isUserLoggedIn && (
        <>
          {currentUserData?.isAdmin && adminDropdown}

          <Link href="/library" className={`main-dropdowns nav-link ${dropdownLibraryClassName}`}>
            Library
          </Link>

          {profileDropdown}
        </>
      )}

      <Link
        href="https://github.com/IbrahemHadidy/red-steam/issues"
        target="_blank"
        rel="noreferrer noopenner"
        className="main-dropdowns nav-link"
      >
        report an issue
      </Link>
    </Nav>
  );
}

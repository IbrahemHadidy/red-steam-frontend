'use client';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Bootstrap Components
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

// Components
import NavigationLinks from './NavigationLinks';
import ProfileDropdown from './ProfileDropdown';

// Images
import bell from '@images/bell.svg';
import installSteamBtn from '@images/btn_header_installsteam_download.png';
import steamLogo from '@images/logo_steam.svg';

// Types
import type { JSX } from 'react';

export default function DefaultDesktopComponent(): JSX.Element {
  // States
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  const handleInstallSteamBtn = (): void => {
    toast.warning('This is not the real Steam website, It is just a clone for learning purposes.');
  };

  const handleNotificationBtn = (): void => {
    toast.info(`Coming soon.`);
  };

  return (
    <>
      <Navbar className="nav-color header-container" variant="dark" collapseOnSelect={false}>
        <Container className="header-content">
          {/* Right-Top-side navigation links */}
          <Nav className="my-nav">
            {/* "Install Steam" button */}
            <Button
              variant="secondary"
              className={`mr-2 compact-button ${!isUserLoggedIn && 'login'}`}
              onClick={handleInstallSteamBtn}
            >
              <span className="button-content button-text">
                <Image
                  className="fa-icon"
                  alt="Install Steam"
                  src={installSteamBtn}
                  style={{ color: '#ffffff' }}
                />{' '}
                Install Steam
              </span>
            </Button>

            {/* "Notifications" button */}
            {isUserLoggedIn && (
              <Button
                variant="secondary"
                className="compact-button"
                onClick={handleNotificationBtn}
              >
                <span className="button-content button-text bell">
                  <Image src={bell} alt="bell" width={14} />
                </span>
              </Button>
            )}

            {/* User profile dropdown menu */}
            {isUserLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <div className="logging">
                <Link href="/login">login</Link>
                &nbsp; | &nbsp;
                <Link href="signup">Sign Up</Link>
              </div>
            )}
          </Nav>

          {/* Brand/logo section */}
          <Link href="/">
            <Image
              alt="Steam"
              src={steamLogo}
              width="180"
              height="80"
              className="d-inline-block align-top"
              priority
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-side navigation links */}
            <NavigationLinks />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

'use client';

// React
import { useContext } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Bootstrap Components
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

// Components
import NavigationLinks from './NavigationLinks';
import ProfileDropdown from './ProfileDropdown';

// Images
import bell from 'images/bell.svg';
import installSteamBtn from 'images/btn_header_installsteam_download.png';
import steamLogo from 'images/logo_steam.svg';

// Types
import type { FC, JSX } from 'react';

const DefaultDesktopComponent: FC = (): JSX.Element => {
  // Init
  const router = useRouter();

  // Contexts
  const { isLoggedIn } = useContext(AuthContext);

  const handleRootNavigation = (): void => {
    router.push('/');
  };

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
              className={`mr-2 compact-button ${!isLoggedIn && 'login'}`}
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
            {isLoggedIn && (
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
            {isLoggedIn ? (
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
          <Navbar.Brand href="" onClick={handleRootNavigation}>
            <Image
              alt="Steam"
              src={steamLogo}
              width="180"
              height="80"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-side navigation links */}
            <NavigationLinks />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DefaultDesktopComponent;

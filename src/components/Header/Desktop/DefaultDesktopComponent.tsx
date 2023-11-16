import { FC } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";
import NavigationLinks from "./NavigationLinks";

const DefaultDesktopComponent: FC = () => {
  return (
    <div>
      <Navbar
        className="custom-bg-color nav-color header-container"
        variant="dark"
        collapseOnSelect={false}
      >
        <Container className="header-content">
          {/* Right-Top-side navigation links */}
          <Nav className="my-nav">
            {/* "Install Steam" button with a FontAwesome icon */}
            <Button variant="secondary" className="mr-2 compact-button">
              <span className="button-content button-text">
                <img
                  className="fa-icon"
                  src="images/btn_header_installsteam_download.png"
                  style={{ color: "#ffffff" }}
                />{" "}
                Install Steam
              </span>
            </Button>

            {/* "Notifications" button with a FontAwesome icon */}
            <Button variant="secondary" className="compact-button">
              <span className="button-content button-text bell">
                <FontAwesomeIcon icon={faBell} style={{ color: "#b8b6b4" }} />
              </span>
            </Button>

            {/* User profile dropdown menu */}
            <ProfileDropdown />
          </Nav>

          {/* Brand/logo section */}
          <Navbar.Brand href="/">
            <img
              alt="Steam"
              src="/images/logo_steam.svg"
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
    </div>
  );
};

export default DefaultDesktopComponent;

import { FC, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from 'contexts/AuthContext';
import sharedData from '../sharedData';

const NavigationLinks: FC = () => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const navigate = useSoftNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (eventKey: string) => {
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  const handleDropdownClick = (link: string) => {
    setIsOpen(null);
    navigate(link);
  };

  const renderNavDropdownWithHover = (
    title: string,
    renderKey: string,
    mainLink: string,
    items: { link: string; text: string }[],
  ) => {
    const isStoreActive =
      location.pathname.startsWith(mainLink) &&
      !location.pathname.startsWith('/user') &&
      !location.pathname.startsWith('/notfound') &&
      !location.pathname.startsWith('/library');
    const dropdownStoreClassName = isStoreActive ? 'active-title' : '';

    const isUserActive = location.pathname.startsWith('/user');
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
          <NavDropdown.Item
            key={index}
            href={item.link}
          >
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  const isLibraryActive = location.pathname.startsWith('/library');
  const dropdownLibraryClassName = isLibraryActive ? 'active-title' : '';

  useEffect(() => {
    setIsOpen(null);
  }, [location]);

  return (
    <Nav>
      {renderNavDropdownWithHover(
        'STORE',
        '1',
        '/',
        sharedData.subMenus[0].items,
      )}
      {isLoggedIn && (
        <Nav.Link
          href="/library"
          onClick={() => navigate('/library')}
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
          sharedData.subMenus[1].items,
        )}
      <Nav.Link
        href="https://github.com/IbrahemHadidy/red-steam/issues"
        target="_blank"
        className="main-dropdowns"
      >
        report an issue
      </Nav.Link>
    </Nav>
  );
};

export default NavigationLinks;

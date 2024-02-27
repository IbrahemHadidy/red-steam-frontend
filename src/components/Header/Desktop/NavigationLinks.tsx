import { FC, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from 'contexts/AuthContext';
import sharedData from "../sharedData";

const NavigationLinks: FC = () => {
  const { isLoggedIn, userData} = useContext(AuthContext);
	const navigate = useNavigate();
 	const location = useLocation();
	const [isOpen, setIsOpen] = useState<string | null>(null);

	const handleDropdownToggle = (eventKey: string) => {
		setIsOpen(eventKey === isOpen ? null : eventKey);
	};

	const handleDropdownClick = (link: string) => {
		setIsOpen(null);
		navigate(link);
	};

	const renderNavDropdownWithHover = (title: string, renderKey: string, mainLink: string, items: { link: string; text: string }[]) => {
		const isStoreActive =
      location.pathname.startsWith(mainLink) &&
      !location.pathname.startsWith('/user');
    const dropdownStoreClassName = isStoreActive ? 'active-title' : '';

		const isUserActive = location.pathname.startsWith('/user');
    const dropdownUserClassName = isUserActive ? 'active-title' : '';
		return (
			<NavDropdown
				title={<span className={`main-dropdowns ${title === 'STORE' ? dropdownStoreClassName : dropdownUserClassName}`}>{title}</span>}
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
      {isLoggedIn &&
        renderNavDropdownWithHover(
          `${userData?.username ? userData.username : 'Profile'}`,
          '3',
          '/user',
          sharedData.subMenus[1].items,
        )}
      <Nav.Link
        href="https://github.com/IbrahemHadidy/red-steam/issues"
        className="main-dropdowns"
      >
        report an issue
      </Nav.Link>
    </Nav>
  );
};

export default NavigationLinks;

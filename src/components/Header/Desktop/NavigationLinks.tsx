import { FC, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from 'contexts/AuthContext';
import sharedData from "../sharedData";

const NavigationLinks: FC = () => {
  	const { isLoggedIn } = useContext(AuthContext);
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
		const isActive = location.pathname.startsWith(mainLink);
		const dropdownClassName = isActive ? "active-title" : "";

		return (
			<NavDropdown
				title={<span className={`main-dropdowns ${dropdownClassName}`}>{title}</span>}
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
			{renderNavDropdownWithHover("STORE", "1", "/", sharedData.subMenus[0].items)}
			{renderNavDropdownWithHover("COMMUNITY", "2", "/community", sharedData.subMenus[1].items)}
			{isLoggedIn && renderNavDropdownWithHover("PROFILE", "3", "/profile", sharedData.subMenus[2].items)}
			<Nav.Link href="/chat" className="main-dropdowns">CHAT</Nav.Link>
			<Nav.Link href="/support" className="main-dropdowns">SUPPORT</Nav.Link>
		</Nav>
	);
};

export default NavigationLinks;

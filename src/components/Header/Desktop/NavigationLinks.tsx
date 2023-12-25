import React, { useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import sharedData from "../sharedData";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationLinksProps {}

const NavigationLinks: React.FC<NavigationLinksProps> = () => {
	const [isOpen, setIsOpen] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

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
			{renderNavDropdownWithHover("PROFILE", "3", "/profile", sharedData.subMenus[2].items)}
			<Nav.Link href="/chat" className="main-dropdowns">CHAT</Nav.Link>
			<Nav.Link href="/support" className="main-dropdowns">SUPPORT</Nav.Link>
		</Nav>
	);
};

export default NavigationLinks;

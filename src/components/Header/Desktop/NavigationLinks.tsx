import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import sharedData from "../sharedData";

interface NavigationLinksProps {}

const NavigationLinks: React.FC<NavigationLinksProps> = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleDropdownToggle = (eventKey: string) => {
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  const renderNavDropdownWithHover = (title: string, renderKey: string, items: { link: string; text: string }[]) => {
    return (
      <NavDropdown
        title={title}
        id={renderKey}
        renderMenuOnMount
        onMouseEnter={() => handleDropdownToggle(renderKey)}
        onMouseLeave={() => handleDropdownToggle(renderKey)}
        show={isOpen === renderKey}
        key={renderKey}
      >
        {items.map((item, index) => (
          <NavDropdown.Item key={index} href={item.link}>
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  return (
    <Nav>
      {renderNavDropdownWithHover("STORE", "1", sharedData.subMenus[0].items)}
      {renderNavDropdownWithHover("COMMUNITY", "2", sharedData.subMenus[1].items)}
      {renderNavDropdownWithHover("PROFILE", "3", sharedData.subMenus[2].items)}
      <Nav.Link href="#chat">CHAT</Nav.Link>
      <Nav.Link href="#support">SUPPORT</Nav.Link>
    </Nav>
  );
};

export default NavigationLinks;

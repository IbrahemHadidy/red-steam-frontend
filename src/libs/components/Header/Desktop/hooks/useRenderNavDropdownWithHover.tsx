import { useAppSelector } from '@store/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

import type { MouseEvent } from 'react';

/**
 * Render a dropdown menu with hover functionality
 * @param pathname - The current pathname
 * @param title - The title of the dropdown
 * @param renderKey - The key to use for rendering the dropdown
 * @param items - The items to render in the dropdown
 * @returns - The rendered dropdown
 */
export default function useRenderNavDropdownWithHover(
  pathname: string,
  title: string,
  renderKey: number,
  items: { link: string; text: string }[]
) {
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const isUserActive = pathname?.includes('/user') && !pathname?.includes('/admin');
  const dropdownUserClassName = isUserActive ? 'active-title' : '';
  const isAdminActive = pathname?.startsWith('/admin');
  const dropdownAdminClassName = isAdminActive ? 'active-title' : '';

  const handleDropdownToggle = (e: MouseEvent, eventKey: number): void => {
    e.preventDefault();
    setIsOpen(eventKey === isOpen ? null : eventKey);
  };

  return (
    <NavDropdown
      title={
        <span
          className={`main-dropdowns ${title.includes('Profile') || title.includes(currentUserData?.username ?? '') ? dropdownUserClassName : ''} ${title.includes('Admin') ? dropdownAdminClassName : ''}`}
        >
          {title}
        </span>
      }
      id={renderKey.toString()}
      className="main-dropdowns"
      renderMenuOnMount
      onMouseEnter={(e) => handleDropdownToggle(e, renderKey)}
      onMouseLeave={(e) => handleDropdownToggle(e, renderKey)}
      show={isOpen === renderKey}
      key={renderKey}
    >
      {items.map((item, idx) => (
        <Link key={idx} href={item.link} className="dropdown-item">
          {item.text}
        </Link>
      ))}
    </NavDropdown>
  );
}

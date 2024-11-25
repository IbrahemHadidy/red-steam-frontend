// React
import { useState } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Types
import type { MenuItem } from '../SecondNavbar.types';

interface GroupedMenuItemProps {
  menuTitle: string;
  categoryGroups: Record<string, MenuItem[]>;
}

export default function GroupedMenuItem({ menuTitle, categoryGroups }: GroupedMenuItemProps) {
  //------------------------------- States --------------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  return (
    <li
      className="nav-item dropdown"
      onMouseEnter={() => setIsMenuOpened(true)}
      onMouseLeave={() => setIsMenuOpened(false)}
    >
      <a
        className={`nav-link navBarItem ${
          menuTitle === 'Your Store' && isUserLoggedIn ? 'special-class' : ''
        }`}
      >
        {menuTitle}
      </a>

      <div
        className={`dropdown-menu ${menuTitle}-div ${isUserLoggedIn ? 'categoryfix' : ''}`}
        style={{
          opacity: isMenuOpened ? 1 : 0,
          pointerEvents: isMenuOpened ? 'auto' : 'none',
        }}
      >
        {isUserLoggedIn && menuTitle === 'Your Store' && (
          <>
            {Object.entries(categoryGroups).map(
              ([category, categoryItems]: [string, MenuItem[]], categoryIndex: number) => (
                <div key={categoryIndex} className={`category-div ${category}`}>
                  {categoryItems.map((categoryItem, itemIndex) => (
                    <Link
                      key={itemIndex}
                      className={`menuItem ${categoryItem.className}`}
                      href={categoryItem.url}
                    >
                      {categoryItem.label}
                    </Link>
                  ))}
                </div>
              )
            )}
          </>
        )}

        {!isUserLoggedIn && menuTitle === 'Your Store' && (
          <div className="category-div store-div" style={{ marginTop: '-10px' }}>
            <Link className="menuItem custom-label" href="/login">
              Home
            </Link>
          </div>
        )}

        {menuTitle !== 'Your Store' && (
          <>
            {Object.entries(categoryGroups).map(([category, categoryItems], categoryIndex) => (
              <div key={categoryIndex} className={`category-div ${category}`}>
                {categoryItems.map((categoryItem, itemIndex) => (
                  <Link
                    key={itemIndex}
                    className={`menuItem ${
                      categoryItem.className
                    } ${categoryItem.specialClass ?? ''}`}
                    href={categoryItem.url}
                  >
                    {categoryItem.label}
                  </Link>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </li>
  );
}

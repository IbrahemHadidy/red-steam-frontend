// React
import { useEffect, useState } from 'react';

// NextJS
import { usePathname } from 'next/navigation';

// Components
import NavSearch from '../NavSearch';

export default function MobileNav() {
  const path = usePathname();

  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  useEffect(() => {
    if (path.includes('/search')) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [path]);

  return (
    <div className="second-nav-mobile">
      <nav className="navbar navbar-expand-sm navbarBg-mobile">
        {!isSearchPage && <NavSearch />}
      </nav>
    </div>
  );
}

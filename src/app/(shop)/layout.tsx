// Components
import RedirectIfNotLoggedIn from '@components/RedirectIfNotLoggedIn';

// Types
import type { JSX, ReactNode } from 'react';
interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps): JSX.Element {
  return (
    <>
      <RedirectIfNotLoggedIn />
      {children}
    </>
  );
}

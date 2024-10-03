// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import RedirectIfNotLoggedIn from '@components/RedirectIfNotLoggedIn';

// Types
import type { JSX, ReactNode } from 'react';
interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps): JSX.Element {
  return (
    <>
      <RedirectIfNotLoggedIn />
      <Header />
      {children}
      <Footer />
    </>
  );
}

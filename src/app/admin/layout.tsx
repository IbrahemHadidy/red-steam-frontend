// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import RedirectIfNotAdmin from '@components/RedirectIfNotAdmin';
import RedirectIfNotLoggedIn from '@components/RedirectIfNotLoggedIn';

// Styles
import '@styles/admin/ActionsModals.scss';
import '@styles/admin/Create.scss';
import '@styles/admin/ItemsList.scss';

// Types
import type { JSX, ReactNode } from 'react';
interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  return (
    <>
      <RedirectIfNotLoggedIn />
      <RedirectIfNotAdmin />
      <Header />
      <main className="admin">{children}</main>
      <Footer />
    </>
  );
}

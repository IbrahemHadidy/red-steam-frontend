// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import RedirectIfNotAdmin from 'components/RedirectIfNotAdmin';
import RedirectIfNotLoggedIn from 'components/RedirectIfNotLoggedIn';

// Styles
import 'styles/admin/ActionsModals.scss';
import 'styles/admin/Create.scss';
import 'styles/admin/ItemsList.scss';

// Types
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <RedirectIfNotLoggedIn />
      <RedirectIfNotAdmin />
      <Header />
      <main className="admin">{children}</main>
      <Footer />
    </>
  );
};

export default AdminLayout;

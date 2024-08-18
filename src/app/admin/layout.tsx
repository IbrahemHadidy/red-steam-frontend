// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import RedirectIfNotAdmin from 'components/RedirectIfNotAdmin';
import RedirectIfNotLoggedIn from 'components/RedirectIfNotLoggedIn';

// Styles
import 'styles/admin/Create.scss';
import 'styles/admin/ItemsList.scss';

// Types
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const CreateLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <RedirectIfNotLoggedIn />
      <RedirectIfNotAdmin />
      <Header />
      <main className="create">{children}</main>
      <Footer />
    </>
  );
};

export default CreateLayout;

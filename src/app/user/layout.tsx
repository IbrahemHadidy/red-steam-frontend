// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import RedirectIfNotLoggedIn from 'components/RedirectIfNotLoggedIn';

// Types
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const SettingsLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <RedirectIfNotLoggedIn />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SettingsLayout;

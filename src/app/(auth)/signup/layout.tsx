// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import RedirectIfLoggedIn from 'components/RedirectIfLoggedIn';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Your Account',
  description: 'Create your Red Steam account',
};

const SignUpLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <RedirectIfLoggedIn />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SignUpLayout;

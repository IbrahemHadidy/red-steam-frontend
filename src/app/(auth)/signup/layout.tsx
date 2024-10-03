// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface SignUpLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Your Account',
  description: 'Create your Red Steam account',
};

export default function SignUpLayout({ children }: SignUpLayoutProps): JSX.Element {
  return (
    <>
      <RedirectIfLoggedIn />
      <Header />
      {children}
      <Footer />
    </>
  );
}

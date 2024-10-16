// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';

// Styles
import '@styles/shop/Library.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface LibraryLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Your library',
  description: 'Your library. All your favorite games. All in one place.',
};

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

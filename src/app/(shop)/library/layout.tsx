// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

// Styles
import 'styles/shop/Library.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Your library',
  description: 'Your library. All your favorite games. All in one place.',
};

const LibraryLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LibraryLayout;

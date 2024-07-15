'use client';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import type { ReactNode } from 'react';

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SecondNavbar />
      {children}
      <Footer />
    </>
  );
}

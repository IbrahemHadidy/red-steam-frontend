// React
import { Suspense } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

// Skeletons
const LoadingSkeleton = dynamic(() => import('./Skeleton'));

// Styles
import '@styles/admin/ActionsModals.scss';
import '@styles/game/Game.scss';

// Types
import type { JSX, ReactNode } from 'react';
interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <SecondNavbar />
      <Suspense fallback={<LoadingSkeleton />}>
        <main className="game">{children}</main>
      </Suspense>
      <Footer />
    </>
  );
}

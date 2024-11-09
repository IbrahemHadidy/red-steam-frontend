// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

// Styles
import '@styles/admin/ActionsModals.scss';
import '@styles/game/Game.scss';
import '@styles/game/GameContent.scss';
import '@styles/game/GameReviews.scss';
import '@styles/game/MediaAndSummary.scss';

// Types
import type { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <>
      <Header />
      <SecondNavbar />
      <main className="game">{children}</main>
      <Footer />
    </>
  );
}

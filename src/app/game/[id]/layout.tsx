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

// Services
import { getById } from '@services/game/data';

// Images
import pwaIcon from '@images/pwa-icon.png';

// Styles
import '@styles/admin/ActionsModals.scss';
import '@styles/game/game.scss';

// Types
import type { Game } from '@entities/game.entity';
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
interface MetaDataProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: MetaDataProps): Promise<Metadata> => {
  try {
    const game: Game | undefined = await getById(Number(params.id));

    const discountPercentage: string = game?.pricing.discountPercentage?.toString() || '';

    return {
      title: `${
        game?.pricing.discount && discountPercentage
          ? `Save ${discountPercentage.replace(/^-(\d+)/, '$1')}% on`
          : ''
      } ${game?.name} on Steam`,
      description: game?.description,
      openGraph: {
        title: `${
          game?.pricing.discount && discountPercentage
            ? `Save ${discountPercentage.replace(/^-(\d+)/, '$1')}% on`
            : ''
        } ${game?.name} on Steam`,
        description: game?.description,
        images: [
          {
            url: game?.thumbnailEntries.mainImage || pwaIcon.src,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log('Error fetching game metadata:', error);
    return {
      title: 'Game not found',
      description: 'Game not found',
    };
  }
};

const GameLayout: FC<Props> = ({ children }): JSX.Element => {
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
};

export default GameLayout;

// React
import { useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import {
  useGetByNewestQuery,
  useGetBySpecialsQuery,
  useGetByTopSalesQuery,
  useGetByUpcomingQuery,
} from '@store/apis/game/data';

// Components
const LeftSection = dynamic(() => import('./LeftSection'));
const RightSection = dynamic(() => import('./RightSection'));

// Skeletons
import Skeleton from './Skeleton';

// Types
import type { Game } from '@interfaces/game';
import type { OpenedTab } from '../Store.types';

export default function HomeTabs() {
  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);

  const [openedTab, setOpenedTab] = useState<OpenedTab>('New & Trending');
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
  const [hoveredGame, setHoveredGame] = useState<Game | null>(null);

  //---------------------------- Redux Queries ----------------------------//
  const { isLoading: newAndTrendingLoading, data: newAndTrending } = useGetByNewestQuery(
    currentUserData?.library.map((item) => item.id) ?? []
  );

  const { isLoading: specialsLoading, data: specials } = useGetBySpecialsQuery(
    currentUserData?.library.map((item) => item.id) ?? []
  );

  const { isLoading: topSellersLoading, data: topSellers } = useGetByTopSalesQuery(
    currentUserData?.library.map((item) => item.id) ?? []
  );

  const { isLoading: popularUpcomingLoading, data: popularUpcoming } = useGetByUpcomingQuery(
    currentUserData?.library.map((item) => item.id) ?? []
  );

  //--------------------------- Event Handlers ----------------------------//
  const handleTabClick = (tab: OpenedTab): void => {
    setOpenedTab(tab);
  };

  const handleTabHover = (idx: number | null): void => {
    setHoveredTabIndex(idx);
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="tab-container">
      {newAndTrendingLoading || specialsLoading || topSellersLoading || popularUpcomingLoading ? (
        <Skeleton />
      ) : (
        <div className="tab-contents">
          <LeftSection
            openedTab={openedTab}
            handleTabClick={handleTabClick}
            hoveredTabIndex={hoveredTabIndex}
            onTabHover={handleTabHover}
            setHoveredGame={setHoveredGame}
            newAndTrending={newAndTrending ?? []}
            specials={specials ?? []}
            topSellers={topSellers ?? []}
            popularUpcoming={popularUpcoming ?? []}
          />
          <RightSection game={hoveredGame} />
        </div>
      )}
    </div>
  );
}

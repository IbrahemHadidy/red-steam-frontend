'use client';

// React
import { useEffect } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setCardSize,
  setIsCompleteModalOpen,
  setIsGameModalOpen,
} from '@store/features/shop/library/librarySlice';

// Constants
import { LIBRARY_BG } from '@config/constants/backgrounds';

// Components
import CardSizeSlider from './CardSizeSlider';
import CompleteModal from './CompleteModal';
import GameCard from './GameCard';
import GameInfo from './GameInfo';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';
import useInitializeLibrary from '../_hooks/useInitializeLibrary';

export default function LibraryPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();
  const isViewport1000OrLess = useResponsiveViewport(1000);

  //------------------------------- States --------------------------------//
  const { selectedGame, userLibrary, isGameModalOpen, isCompleteModalOpen, isLibraryInitialized } =
    useAppSelector((state) => state.shop.library);

  //------------------------------- Hooks ---------------------------------//
  useInitializeLibrary();

  // Set card size to 320 on viewport less than 1000px on mount
  useEffect(() => {
    if (isViewport1000OrLess) dispatch(setCardSize(320));
  }, [dispatch, isViewport1000OrLess]);

  //---------------------------- Event Handlers ----------------------------//
  const handleCloseShowClick = (): void => {
    dispatch(setIsGameModalOpen(false));
  };

  const handleCloseCompleteClick = (): void => {
    dispatch(setIsCompleteModalOpen(false));
  };

  //------------------------------- Render --------------------------------//
  useDynamicBackground(LIBRARY_BG);

  if (!isLibraryInitialized) {
    // TODO: Add skeleton
    return <></>;
  } else {
    return (
      <>
        <div className="Library">
          {userLibrary?.length === 0 && (
            <div className="no-games">
              <div className="no-game">You have no games in your library</div>
              <Link className="back-button" href="/">
                <span>Go to store</span>
              </Link>
            </div>
          )}

          <div className="game-list">
            {userLibrary?.map((game) => <GameCard game={game} key={game.id} />)}
          </div>

          {!isViewport1000OrLess && userLibrary?.length !== 0 && <CardSizeSlider />}
        </div>

        <div className={`before-play-info ${isGameModalOpen ? 'shown' : ''}`}>
          {selectedGame && <GameInfo />}
        </div>

        {isCompleteModalOpen && <CompleteModal />}

        {isGameModalOpen && <div className="show-overlay" onClick={handleCloseShowClick} />}

        {isCompleteModalOpen && (
          <div className="complete-overlay" onClick={handleCloseCompleteClick} />
        )}
      </>
    );
  }
}

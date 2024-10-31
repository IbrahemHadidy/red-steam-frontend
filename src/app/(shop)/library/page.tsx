'use client';

// React
import { useEffect } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  initializeLibrary,
  setCardSize,
  setIsCompleteModalOpen,
  setIsGameModalOpen,
} from '@store/features/shop/library/librarySlice';

// Constants
import { LIBRARY_BG } from '@config/constants/backgrounds';

// Components
const GameCard = dynamic(() => import('./GameCard'));
const CardSizeSlider = dynamic(() => import('./CardSizeSlider'));
const GameInfo = dynamic(() => import('./GameInfo'));
const CompleteModal = dynamic(() => import('./CompleteModal'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';

export default function LibraryPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();
  const isViewport1000 = useResponsiveViewport(1000);
  useDynamicBackground(LIBRARY_BG);

  //--------------------------- State Selectors ---------------------------//
  const { selectedGame, userLibrary, isGameModalOpen, isCompleteModalOpen } = useAppSelector(
    (state) => state.shop.library
  );

  //------------------------------ On Mount -------------------------------//
  // Initialize library (fetch user library)
  useEffect(() => {
    dispatch(initializeLibrary());
  }, [dispatch]);

  // Set card size to 320 on viewport less than 1000px
  useEffect(() => {
    if (isViewport1000) dispatch(setCardSize(320));
  }, [dispatch, isViewport1000]);

  //---------------------------- Event Handlers ----------------------------//
  const handleCloseShowClick = (): void => {
    dispatch(setIsGameModalOpen(false));
  };

  const handleCloseCompleteClick = (): void => {
    dispatch(setIsCompleteModalOpen(false));
  };

  //-------------------------- Render UI Section --------------------------//
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

        {!isViewport1000 && userLibrary?.length !== 0 && <CardSizeSlider />}
      </div>

      <div className={`before-play-info ${isGameModalOpen ? 'shown' : ''}`}>
        {selectedGame && <GameInfo />}
      </div>

      {isCompleteModalOpen && <CompleteModal />}

      {isGameModalOpen && <div className="show-overlay" onClick={handleCloseShowClick}></div>}

      {isCompleteModalOpen && (
        <div className="complete-overlay" onClick={handleCloseCompleteClick}></div>
      )}
    </>
  );
}

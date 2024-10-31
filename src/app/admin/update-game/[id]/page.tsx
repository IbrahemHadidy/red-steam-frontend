'use client';

// React
import { use, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeGameUpdate } from '@store/features/admin/game/gameAdminSlice';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';
import Loading from '@app/loading';

interface GameUpdateProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GameUpdate({ params }: GameUpdateProps) {
  //--------------------------- Initializations ---------------------------//
  const { id } = use(params);
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { isUpdateFetching, isGameUpdateInitialized } = useAppSelector((state) => state.admin.game);

  //-------------------------- Portals Selection  -------------------------//
  const loadingPortal = document.getElementById('loading-portal');

  //------------------------------- Effects -------------------------------//
  // Initialize Game Update on id change
  useEffect(() => {
    if (!isGameUpdateInitialized) dispatch(initializeGameUpdate(+id));
  }, [dispatch, id, isGameUpdateInitialized]);

  //--------------------------- Render UI Section -------------------------//
  return isUpdateFetching && loadingPortal ? (
    createPortal(<Loading />, loadingPortal)
  ) : (
    <GameAdmin />
  );
}

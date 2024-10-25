'use client';

// React
import { use, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
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
  const { id } = use(params);
  const dispatch = useAppDispatch();

  const { isUpdateFetching, isGameUpdateInitialized } = useAppSelector((state) => state.gameAdmin);

  const loadingPortal = document.getElementById('loading-portal');

  useEffect(() => {
    if (!isGameUpdateInitialized) {
      dispatch(initializeGameUpdate(+id));
    }
  }, [dispatch, id, isGameUpdateInitialized]);

  return isUpdateFetching && loadingPortal ? (
    createPortal(<Loading />, loadingPortal)
  ) : (
    <GameAdmin />
  );
}

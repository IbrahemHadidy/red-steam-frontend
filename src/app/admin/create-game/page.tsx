'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { reset, setType } from '@store/features/admin/game/gameAdminSlice';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';

export default function GameCreate() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- Effects -------------------------------//
  // Reset state on Mount
  useEffect(() => {
    dispatch(setType('create'));
    dispatch(reset());
  }, [dispatch]);

  return <GameAdmin />;
}

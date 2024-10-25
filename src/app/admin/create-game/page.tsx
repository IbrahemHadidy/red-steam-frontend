'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { resetMedia } from '@store/features/admin/game/gameAdminSlice';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';

export default function GameCreate() {
  // Init
  const dispatch = useAppDispatch();

  // Reset Media
  useEffect(() => {
    dispatch(resetMedia());
  }, [dispatch]);

  return <GameAdmin />;
}

'use client';

// React
import { use, useEffect } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  initializeGameUpdate,
  reset,
  setIsGameUpdateInitialized,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';
import FormSkeleton from '@app/admin/_GameAdmin/Skeleton';

interface GameUpdateProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GameUpdate({ params }: GameUpdateProps) {
  //--------------------------- Initializations ---------------------------//
  const { id } = use(params);
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isUpdateFetching } = useAppSelector((state) => state.admin.game);

  //------------------------------- Effects -------------------------------//
  // Initialize Game Update on id change
  useEffect(() => {
    if (id) dispatch(initializeGameUpdate(+id));
    return () => {
      dispatch(reset());
      dispatch(setIsGameUpdateInitialized(false));
    };
  }, [dispatch, id]);

  //-------------------------------- Render -------------------------------//

  return isUpdateFetching ? (
    <div className="game-creation-form">
      <h1 className="form-title">Update Game Details</h1>
      <FormSkeleton />
    </div>
  ) : (
    <GameAdmin />
  );
}

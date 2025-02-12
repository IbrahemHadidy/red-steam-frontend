'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { initializePublishersAdmin, setIsInitialized } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';

export default function PublishersAdmin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializePublishersAdmin());
    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch]);

  return <Admin />;
}

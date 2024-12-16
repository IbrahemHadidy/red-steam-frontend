'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { initializeOffersAdmin, setIsInitialized } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';

export default function OffersAdmin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeOffersAdmin());
    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch]);

  return <Admin />;
}

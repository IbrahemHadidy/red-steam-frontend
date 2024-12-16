'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { initializeFeaturesAdmin, setIsInitialized } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';

export default function FeaturesAdmin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeFeaturesAdmin());
    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch]);

  return <Admin />;
}

'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { initializeDevelopersAdmin } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';

export default function DevelopersAdmin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDevelopersAdmin());
  }, [dispatch]);

  return <Admin />;
}

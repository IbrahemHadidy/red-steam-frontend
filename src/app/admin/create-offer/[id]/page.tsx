'use client';

// React
import { use, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// NextJS
import { useRouter } from 'next/navigation';

// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeCreateOfferAdmin } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';
import Loading from '@app/loading';

interface CreateOfferAdminProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CreateOfferAdmin(props: CreateOfferAdminProps) {
  const params = use(props.params);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { offerGame } = useAppSelector((state) => state.admin.common);
  const [loadingPortal, setLoadingPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(initializeCreateOfferAdmin(+params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (offerGame?.pricing?.free) {
      setLoadingPortal(document.getElementById('loading-portal'));
      toast.warn('Free games cannot have offers');
      router.push(`/game/${offerGame.id}`);
    }
  }, [offerGame, router]);

  return !offerGame && loadingPortal ? createPortal(<Loading />, loadingPortal) : <Admin />;
}

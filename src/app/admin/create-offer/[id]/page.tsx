'use client';

// React
import { use, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// NextJS
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from '@app/admin/_Admin/Admin';
import Loading from '@app/loading';

// Services
import { getById } from '@services/game/data';
import { createOffer } from '@services/game/offer';

// Utils
import get7DaysFromNow from '@utils/get7DaysFromNow';
import Decimal from 'decimal.js';

// Types
import type { Game } from '@interfaces/game';

interface CreateOfferAdminProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CreateOfferAdmin(props: CreateOfferAdminProps) {
  const params = use(props.params);
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //--------------------------- State Selectors ---------------------------//
  const [game, setGame] = useState<Game>();
  const [discountPrice, setDiscountPrice] = useState<Decimal>(new Decimal('0.00'));
  const [offerType, setOfferType] = useState<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>(
    'SPECIAL PROMOTION'
  );
  const [discountStartDate, setDiscountStartDate] = useState<Date>(new Date());
  const [discountEndDate, setDiscountEndDate] = useState<Date>(get7DaysFromNow());
  const [submitted, setSubmitted] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingPortal = document.getElementById('loading-portal');

  useEffect(() => {
    (async (): Promise<void> => {
      const fetchedGame: Game | undefined = await getById(+params.id);
      if (fetchedGame) {
        if (fetchedGame.pricing?.free) {
          toast.warn('Free games cannot have offers');
          router.push(`/game/${fetchedGame.id}`);
          return;
        }
        setGame(fetchedGame);
        setIsLoading(false);
      } else {
        toast.error('Game not found');
        router.push('/not-found');
        return;
      }
    })();
  }, [params.id, router]);

  const onSubmit = async (): Promise<void> => {
    const response = await toast.promise(
      createOffer(
        game?.pricing?.id ?? 0,
        discountPrice.toString(),
        offerType,
        discountStartDate,
        discountEndDate
      ),
      {
        pending: 'Creating offer...',
        success: 'Offer created successfully',
        error: 'Failed to create offer, please try again',
      }
    );

    if (response.message) {
      setSubmitted((prevSubmitted) => prevSubmitted + 1);
    } else {
      toast.error('Failed to create offer, please try again');
    }
  };

  return isLoading && loadingPortal ? (
    createPortal(<Loading />, loadingPortal)
  ) : (
    <Admin
      type="create-offer"
      game={game}
      discountPrice={discountPrice}
      setDiscountPrice={setDiscountPrice}
      discountStartDate={discountStartDate}
      offerType={offerType}
      setOfferType={setOfferType}
      setDiscountStartDate={setDiscountStartDate}
      discountEndDate={discountEndDate}
      setDiscountEndDate={setDiscountEndDate}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
}

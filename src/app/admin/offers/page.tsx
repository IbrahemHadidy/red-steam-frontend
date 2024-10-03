'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Services
import { createOffer } from '@services/game/offer';

// Utils
import get7DaysFromNow from '@utils/get7DaysFromNow';
import Decimal from 'decimal.js';

// Types
import type { JSX } from 'react';

export default function OffersAdmin(): JSX.Element {
  // States
  const [gameId, setGameId] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<Decimal>(new Decimal('0.00'));
  const [offerType, setOfferType] = useState<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>(
    'SPECIAL PROMOTION'
  );
  const [discountStartDate, setDiscountStartDate] = useState<Date>(new Date());
  const [discountEndDate, setDiscountEndDate] = useState<Date>(get7DaysFromNow());
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    await toast.promise(
      createOffer(gameId, discountPrice.toString(), offerType, discountStartDate, discountEndDate),
      {
        pending: 'Creating offer...',
        success: 'Offer created successfully',
        error: 'Failed to create offer, please try again',
      }
    );

    setSubmitted((prevSubmitted) => prevSubmitted + 1);
    setGameId(0);
    setDiscountPrice(new Decimal('0.00'));
    setOfferType('SPECIAL PROMOTION');
    setDiscountStartDate(new Date());
    setDiscountEndDate(get7DaysFromNow());
  };

  return (
    <Admin
      type="offer"
      gameId={gameId}
      setGameId={setGameId}
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

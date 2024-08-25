'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Services
import { createOffer } from 'services/game/offer';

// Utils
import get7DaysFromNow from 'utils/get7DaysFromNow';

// Types
import type { FC, JSX } from 'react';

const OffersAdmin: FC = (): JSX.Element => {
  // States
  const [gameId, setGameId] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [offerType, setOfferType] = useState<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>(
    'SPECIAL PROMOTION'
  );
  const [discountStartDate, setDiscountStartDate] = useState<Date>(new Date());
  const [discountEndDate, setDiscountEndDate] = useState<Date>(get7DaysFromNow());
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createOffer(
      gameId,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate
    );
    toast.success(result.message);
    setSubmitted(submitted + 1);
    setGameId(0);
    setDiscountPrice(0);
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
};

export default OffersAdmin;

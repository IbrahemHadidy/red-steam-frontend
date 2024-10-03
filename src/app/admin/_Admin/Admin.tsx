// Components
import Create from './CreateForm';
import ItemsList from './ItemsList';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Types
import type { JSX } from 'react';
import type { AdminProps } from './admin.types';

export default function Admin({
  type,
  name,
  setName,
  website,
  setWebsite,
  handleIconChange,
  icon,
  gameId,
  setGameId,
  discountPrice,
  setDiscountPrice,
  offerType,
  setOfferType,
  discountStartDate,
  setDiscountStartDate,
  discountEndDate,
  setDiscountEndDate,
  onSubmit,
  submitted,
}: AdminProps): JSX.Element {
  // Init
  useDynamicBackground(`#181A21`);

  return (
    <>
      {type !== 'review' && (
        <Create
          type={type}
          name={name}
          setName={setName}
          website={website}
          setWebsite={setWebsite}
          handleIconChange={handleIconChange}
          gameId={gameId}
          setGameId={setGameId}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          offerType={offerType}
          setOfferType={setOfferType}
          discountStartDate={discountStartDate}
          setDiscountStartDate={setDiscountStartDate}
          discountEndDate={discountEndDate}
          setDiscountEndDate={setDiscountEndDate}
          icon={icon}
          onSubmit={onSubmit}
        />
      )}
      <ItemsList type={type} submitted={submitted} />
    </>
  );
}

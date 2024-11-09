// Components
import Create from './CreateForm';
import ItemsList from './ItemsList';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Constants
import { ADMIN_BG } from '@config/constants/backgrounds';

// Types
import type { AdminProps } from './admin.types';

export default function Admin({
  type,
  name,
  setName,
  website,
  setWebsite,
  handleIconChange,
  icon,
  game,
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
}: AdminProps) {
  //--------------------------- Initializations ---------------------------//
  useDynamicBackground(ADMIN_BG);

  return (
    <>
      <Create
        type={type}
        name={name}
        setName={setName}
        website={website}
        setWebsite={setWebsite}
        handleIconChange={handleIconChange}
        game={game}
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
      <ItemsList type={type} submitted={submitted} />
    </>
  );
}

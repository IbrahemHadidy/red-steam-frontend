// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Constants
import { ADMIN_BG } from '@config/constants/backgrounds';

// Components
import Create from './CreateForm';
import ItemsList from './ItemsList';
import Skeleton from './Skeleton';

// Enums
import { AdminType } from '@enums/admin';

export default function Admin() {
  const { adminType, isInitialized } = useAppSelector((state) => state.admin.common);

  useDynamicBackground(ADMIN_BG);

  return !isInitialized ? (
    <Skeleton />
  ) : (
    <>
      {![AdminType.Review, AdminType.Offer].includes(adminType) && <Create />}
      <ItemsList />
    </>
  );
}

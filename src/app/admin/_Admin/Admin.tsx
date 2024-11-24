// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import Create from './CreateForm';
import ItemsList from './ItemsList';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Constants
import { ADMIN_BG } from '@config/constants/backgrounds';

export default function Admin() {
  const { adminType } = useAppSelector((state) => state.admin.common);
  useDynamicBackground(ADMIN_BG);
  return (
    <>
      {!['review', 'offer'].includes(adminType) && <Create />}
      <ItemsList />
    </>
  );
}

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import ItemsPerPage from './ItemsPerPage';
import SearchByGame from './SearchByGame';
import SearchByName from './SearchByName';
import SearchByUser from './SearchByUser';
import SearchByWebsite from './SearchByWebsite';

// Enums
import { AdminType } from '@enums/admin';

export default function Filters() {
  const { adminType } = useAppSelector((state) => state.admin.common);

  return (
    <div className="filters">
      <div className="search-box">
        {[AdminType.Offer, AdminType.CreateOffer].includes(adminType) && <SearchByGame />}

        {![AdminType.Review, AdminType.Offer, AdminType.CreateOffer].includes(adminType) && (
          <SearchByName />
        )}

        {[AdminType.Publisher, AdminType.Developer].includes(adminType) && <SearchByWebsite />}

        {adminType === AdminType.Review && (
          <>
            <SearchByUser />
            <SearchByGame />
          </>
        )}
      </div>

      <ItemsPerPage />
    </div>
  );
}

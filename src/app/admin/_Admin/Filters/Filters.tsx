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
        {[AdminType.OFFER, AdminType.CREATE_OFFER].includes(adminType) && <SearchByGame />}

        {![AdminType.REVIEW, AdminType.OFFER, AdminType.CREATE_OFFER].includes(adminType) && (
          <SearchByName />
        )}

        {[AdminType.PUBLISHER, AdminType.DEVELOPER].includes(adminType) && <SearchByWebsite />}

        {adminType === AdminType.REVIEW && (
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

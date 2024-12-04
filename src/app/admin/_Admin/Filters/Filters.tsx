// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import ItemsPerPage from './ItemsPerPage';
import SearchByGame from './SearchByGame';
import SearchByName from './SearchByName';
import SearchByUser from './SearchByUser';
import SearchByWebsite from './SearchByWebsite';

export default function Filters() {
  const { adminType } = useAppSelector((state) => state.admin.common);

  return (
    <div className="filters">
      <div className="search-box">
        {['offer', 'create-offer'].includes(adminType) && <SearchByGame />}

        {!['review', 'offer', 'create-offer'].includes(adminType) && <SearchByName />}

        {['developer', 'publisher'].includes(adminType) && <SearchByWebsite />}

        {adminType === 'review' && (
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

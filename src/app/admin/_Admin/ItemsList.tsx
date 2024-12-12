// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Filters from './Filters/Filters';
import Pagination from './Pagination';
import Table from './Table/Table';

// Enums
import { AdminType } from '@enums/admin';

export default function ItemsList() {
  const { adminType, isEditModalOpen, isDeleteModalOpen, items } = useAppSelector(
    (state) => state.admin.common
  );

  const title = adminType.charAt(0).toUpperCase() + adminType.slice(1).toLowerCase();

  return (
    <>
      <div
        className={`items-list-container ${[AdminType.Offer, AdminType.CreateOffer].includes(adminType) ? 'wide-list' : ''}`}
      >
        {![AdminType.Offer, AdminType.Review].includes(adminType) && <hr />}
        {[AdminType.Offer, AdminType.CreateOffer].includes(adminType) ? (
          <h1 className="list-title">Current Offers</h1>
        ) : (
          <h1 className="list-title">{title}s List</h1>
        )}

        <Filters />
        {items.length !== 0 ? (
          <>
            <Table />
            <Pagination />
          </>
        ) : (
          <h2 className="no-items">No {title}s found</h2>
        )}
      </div>

      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteModal />}
    </>
  );
}

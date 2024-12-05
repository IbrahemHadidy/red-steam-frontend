// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Filters from './Filters/Filters';
import Pagination from './Pagination';
import Table from './Table/Table';

export default function ItemsList() {
  const { adminType, isEditModalOpen, isDeleteModalOpen, items } = useAppSelector(
    (state) => state.admin.common
  );

  return (
    <>
      <div
        className={`items-list-container ${['offer', 'create-offer'].includes(adminType) ? 'wide-list' : ''}`}
      >
        {!['offer', 'review'].includes(adminType) && <hr />}
        {['offer', 'create-offer'].includes(adminType) ? (
          <h1 className="list-title">Current Offers</h1>
        ) : (
          <h1 className="list-title">
            {adminType.charAt(0).toUpperCase() + adminType.slice(1)}s List
          </h1>
        )}

        <Filters />
        {items.length !== 0 ? (
          <>
            <Table />
            <Pagination />
          </>
        ) : (
          <h2 className="no-items">
            No {adminType.charAt(0).toUpperCase() + adminType.slice(1)}s found
          </h2>
        )}
      </div>

      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteModal />}
    </>
  );
}

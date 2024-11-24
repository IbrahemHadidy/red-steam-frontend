// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Filters from './Filters/Filters';
import Pagination from './Pagination';
import Table from './Table/Table';

export default function ItemsList() {
  const { adminType, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.admin.common
  );

  return (
    <>
      <div
        className={`items-list-container ${['offer', 'create-offer'].includes(adminType) ? 'wide-list' : ''}`}
      >
        <hr />
        {['offer', 'create-offer'].includes(adminType) ? (
          <h1 className="list-title">Current Offers</h1>
        ) : (
          <h1 className="list-title">
            {adminType.charAt(0).toUpperCase() + adminType.slice(1)}s List
          </h1>
        )}

        <Filters />
        <Table />
        <Pagination />
      </div>

      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteModal />}
    </>
  );
}

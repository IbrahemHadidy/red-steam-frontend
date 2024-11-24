// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setCurrentPage, setItemsPerPage } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent } from 'react';

export default function ItemsPerPage() {
  const dispatch = useAppDispatch();
  const { itemsPerPage } = useAppSelector((state) => state.admin.common);

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setItemsPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="items-per-page">
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

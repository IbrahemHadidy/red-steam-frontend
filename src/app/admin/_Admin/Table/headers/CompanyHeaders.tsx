import { useAppDispatch, useAppSelector } from '@store/hooks';

import { setSortConfig } from '@store/features/admin/adminSlice';

import getSortArrow from '../../utils/getSortArrow';
import sortItems from '../../utils/sortItems';

import type { SortArrow } from '../../utils/getSortArrow';

export default function CompanyHeaders() {
  const dispatch = useAppDispatch();
  const { sortConfig } = useAppSelector((state) => state.admin.common);

  const sortArrow = (key: string): SortArrow => {
    return getSortArrow(key, sortConfig);
  };

  const sortBykey = (key: string): void => {
    const sortedItems = sortItems(key, sortConfig);
    dispatch(setSortConfig(sortedItems));
  };

  return (
    <>
      <th onClick={() => sortBykey('id')}>ID {sortArrow('id')}</th>
      <th onClick={() => sortBykey('name')}>Name {sortArrow('name')}</th>
      <th onClick={() => sortBykey('website')}>Website {sortArrow('website')}</th>
    </>
  );
}

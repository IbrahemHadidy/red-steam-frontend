import { useAppDispatch, useAppSelector } from '@store/hooks';

import { setSortConfig } from '@store/features/admin/adminSlice';

import getSortArrow from '../../utils/getSortArrow';
import sortItems from '../../utils/sortItems';

import type { SortArrow } from '../../utils/getSortArrow';

export default function ReviewHeaders() {
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
      <th onClick={() => sortBykey('user')}>User {sortArrow('user')}</th>
      <th onClick={() => sortBykey('name')}>Game {sortArrow('name')}</th>
      <th onClick={() => sortBykey('content')}>Content {sortArrow('content')}</th>
      <th className="center" onClick={() => sortBykey('rating')}>
        Rating {sortArrow('rating')}
      </th>
    </>
  );
}

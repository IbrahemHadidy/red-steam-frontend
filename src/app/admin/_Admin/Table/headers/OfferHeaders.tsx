import { useAppDispatch, useAppSelector } from '@store/hooks';

import { setSortConfig } from '@store/features/admin/adminSlice';

import getSortArrow from '../../utils/getSortArrow';
import sortItems from '../../utils/sortItems';

import type { SortArrow } from '../../utils/getSortArrow';

export default function OfferHeaders() {
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
      <th className="offer" onClick={() => sortBykey('id')}>
        Game ID {sortArrow('id')}
      </th>
      <th onClick={() => sortBykey('name')}>Game {sortArrow('name')}</th>
      <th className="center" onClick={() => sortBykey('basePrice')}>
        Base Price {sortArrow('basePrice')}
      </th>
      <th className="center" onClick={() => sortBykey('discountPrice')}>
        Discount Price {sortArrow('discountPrice')}
      </th>
      <th className="center" onClick={() => sortBykey('discountPercentage')}>
        Discount Percentage {sortArrow('discountPercentage')}
      </th>
      <th className="center" onClick={() => sortBykey('offerType')}>
        Offer Type {sortArrow('offerType')}
      </th>
      <th className="center" onClick={() => sortBykey('discountStartDate')}>
        Start Date {sortArrow('discountStartDate')}
      </th>
      <th className="center" onClick={() => sortBykey('discountEndDate')}>
        End Date {sortArrow('discountEndDate')}
      </th>
    </>
  );
}

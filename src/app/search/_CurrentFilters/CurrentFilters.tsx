// React
import { useRef } from 'react';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import ExcludedFilters from './ExcludedFilters';
import IncludedFilters from './IncludedFilters';
import SearchQueryFilter from './SearchQueryFilter';

export default function CurrentFilters() {
  const { searchQuery, filters } = useAppSelector((state) => state.search);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="page-content"
      style={{ marginTop: '20px', paddingLeft: '2px' }}
      ref={contentRef}
    >
      {Object.values(filters)
        .flat()
        .filter((row) => row.check !== 'unchecked').length === 0 && searchQuery === '' ? (
        <div className="search-title">All Products</div>
      ) : (
        <>
          <SearchQueryFilter />
          <IncludedFilters />
          <ExcludedFilters />
        </>
      )}
    </div>
  );
}

// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { uncheckFilter } from '@store/features/search/searchSlice';

// Images
import searchCrouton from '@images/search_crouton_not.svg';

// Types
import type { Filter, FilterState } from '@custom-types/search';

export default function ExcludedFilters() {
  const dispatch = useAppDispatch();

  const { filters } = useAppSelector((state) => state.search);

  const handleFilterUncheck = (filterType: keyof FilterState, id: number) => {
    dispatch(uncheckFilter({ filterType, id }));
  };

  return (
    <>
      {Object.entries(filters).flatMap(([filterType, filterArray]) =>
        filterArray.map((row: Filter) =>
          row.check === 'excluded' ? (
            <div className="search-filter excluded" key={`${filterType}-${row.id}-exclude`}>
              <Image src={searchCrouton} alt="excluded" />
              {row.name}
              <a onClick={() => handleFilterUncheck(filterType as keyof FilterState, row.id)} />
            </div>
          ) : null
        )
      )}
    </>
  );
}

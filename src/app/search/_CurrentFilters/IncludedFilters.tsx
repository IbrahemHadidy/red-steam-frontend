// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { uncheckFilter } from '@store/features/search/searchSlice';

// Enums
import { FilterCheckType } from '@enums/search';

// Types
import type { Filter, FilterState } from '@custom-types/search';

export default function IncludedFilters() {
  const dispatch = useAppDispatch();

  const { filters } = useAppSelector((state) => state.search);

  const handleFilterUncheck = (filterType: keyof FilterState, id: number) => {
    dispatch(uncheckFilter({ filterType, id }));
  };

  return (
    <>
      {Object.entries(filters).flatMap(([filterType, filterArray]) =>
        filterArray.map((row: Filter) =>
          row.check === FilterCheckType.Included ? (
            <div className="search-filter" key={`${filterType}-${row.id}-include`}>
              {row.name}
              <a onClick={() => handleFilterUncheck(filterType as keyof FilterState, row.id)} />
            </div>
          ) : null
        )
      )}
    </>
  );
}

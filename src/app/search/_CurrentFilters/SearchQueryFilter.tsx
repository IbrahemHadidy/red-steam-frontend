// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setSearchInputValue, setSearchQuery } from '@store/features/search/searchSlice';

export default function SearchQueryFilter() {
  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector((state) => state.search);

  const handleSearchDeleteFilter = (): void => {
    dispatch(setSearchInputValue(''));
    dispatch(setSearchQuery(''));
  };

  return (
    <>
      {searchQuery !== '' && (
        <div className="search-filter">
          {searchQuery}
          <a onClick={handleSearchDeleteFilter} />
        </div>
      )}
    </>
  );
}

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setRequestParams } from '@store/features/search/searchSlice';

// Redux Thunks
import { fetchSearchResults } from '@store/features/search/searchThunks';

// Components
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

// Skeletons
import { LoadingResults } from '../Skeleton';

export default function SearchLeft() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { hasMoreResults, requestParams, searchResults, isFetchDisabled } = useAppSelector(
    (state) => state.search
  );

  //---------------------------- Event Handlers ---------------------------//
  const handleNextItems = async (): Promise<void> => {
    if (!isFetchDisabled) {
      dispatch(
        setRequestParams({
          ...requestParams,
          pagination: { ...requestParams.pagination, page: requestParams.pagination.page + 1 },
        })
      );
      await dispatch(fetchSearchResults(true));
    }
  };

  //-------------------------------- Render -------------------------------//
  return (
    <div className="search-leftcol">
      <SearchBar />

      <div className={`search-results ${isFetchDisabled ? 'disabled' : ''}`}>
        <InfiniteScroll
          dataLength={searchResults.length}
          next={handleNextItems}
          hasMore={hasMoreResults}
          loader={<LoadingResults />}
          endMessage={
            <div className="end-of-results">
              {searchResults.length === 0 ? (
                <>
                  <span>The shadows are empty... </span>
                  <br />
                  <span className="hint">Maybe another search will reveal something!</span>
                </>
              ) : (
                'Nothing else hiding in the shadows.'
              )}
            </div>
          }
        >
          {searchResults.map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

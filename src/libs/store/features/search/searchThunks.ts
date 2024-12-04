// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { setIsFetchDisabled } from './searchSlice';

// APIs
import gameDataApi from '@store/apis/game/data';

// Utils
import debounce from '@utils/debounce';
import promiseToast from '@utils/promiseToast';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch } from '@store/store';

interface FetchSearchResultsFulfillValue {
  games: Game[];
  hasMoreResults: boolean;
}

export const fetchSearchResults = createAppAsyncThunk<
  FetchSearchResultsFulfillValue,
  boolean | void
>(
  'search/fetchSearchResults',
  async (addToEnd, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { requestParams, searchResults } = getState().search;

    const response = await promiseToast(
      dispatch(
        gameDataApi.endpoints.getByParameters.initiate({
          searchData: requestParams.searchData,
          pagination: requestParams.pagination,
        })
      ).unwrap(),
      {
        pending: 'Loading search results',
        fallbackError: 'An error occurred while loading games. Please try again.',
        onlyError: true,
      }
    );
    if (!response) return rejectWithValue('Error loading games');

    // Add new games to the current list, avoiding duplicates.
    let newSearchResults: Game[] = [...searchResults];
    if (addToEnd) {
      newSearchResults.push(
        ...response.filter(
          (newGame) => !searchResults.some((prevGame) => prevGame.id === newGame.id)
        )
      );
    } else {
      newSearchResults = response;
    }

    const fullFillValue: FetchSearchResultsFulfillValue = {
      games: newSearchResults,
      hasMoreResults: response.length > 0,
    };

    return fulfillWithValue(fullFillValue);
  }
);

export const debouncedFetchSearchResults = (() => {
  const debounced = debounce(
    (dispatch: AppDispatch, addToEnd?: boolean) => dispatch(fetchSearchResults(addToEnd)),
    500
  );

  return (dispatch: AppDispatch, addToEnd?: boolean) => {
    dispatch(setIsFetchDisabled(true));
    debounced(dispatch, addToEnd);
  };
})();

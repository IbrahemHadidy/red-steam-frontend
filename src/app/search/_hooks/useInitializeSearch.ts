import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { initializeSearch } from '@store/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

/**
 * Custom hook to initialize the search state when the search page is loaded
 */
export default function useInitializeSearch() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { isAuthInitialized } = useAppSelector((state) => state.auth);
  const { isSearchInitialized } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (!isSearchInitialized && isAuthInitialized)
      dispatch(initializeSearch(searchParams.toString()));
  }, [dispatch, isAuthInitialized, isSearchInitialized, searchParams]);
}

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { initializeSearch, resetSearch } from '@store/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

/**
 * Custom hook to initialize the search state when the search page is loaded
 */
export default function useInitializeSearch() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { isAuthInitialized } = useAppSelector((state) => state.auth);
  const { isSearchInitialized } = useAppSelector((state) => state.search);

  const [isCalled, setIsCalled] = useState<boolean>(false);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    if (!isSearchInitialized && !isCalled && isAuthInitialized) {
      setIsCalled(true);
      dispatch(initializeSearch(searchParamsString));
    }
  }, [dispatch, isAuthInitialized, isCalled, isSearchInitialized, searchParamsString]);

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
      setIsCalled(false);
    };
  }, [dispatch]);
}

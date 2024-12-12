// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeLibrary, reset } from '@store/features/shop/library/librarySlice';

export default function useInitializeLibrary() {
  const dispatch = useAppDispatch();
  const { isAuthInitialized } = useAppSelector((state) => state.auth);

  // Fetch library data
  useEffect(() => {
    if (isAuthInitialized) dispatch(initializeLibrary());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isAuthInitialized]);
}

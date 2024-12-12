// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeWishlist, reset } from '@store/features/shop/wishlist/wishlistSlice';

export default function useInitializeWishlist() {
  const dispatch = useAppDispatch();
  const { isAuthInitialized } = useAppSelector((state) => state.auth);

  // Fetch wishlist data
  useEffect(() => {
    if (isAuthInitialized) dispatch(initializeWishlist());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isAuthInitialized]);
}

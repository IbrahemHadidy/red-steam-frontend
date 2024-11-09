import { useEffect } from 'react';

import { setIsPageVisible } from '@store/features/game/gameSlice';
import { useAppDispatch } from '@store/hooks';

/**
 * Track if the page is visible
 */
const usePageVisibility = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleVisibilityChange = (): void => {
      dispatch(setIsPageVisible(!document.hidden));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);
};

export default usePageVisibility;

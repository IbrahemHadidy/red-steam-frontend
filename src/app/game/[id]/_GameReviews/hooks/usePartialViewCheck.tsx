import { useEffect, useState } from 'react';

import useResponsiveViewport from '@hooks/useResponsiveViewport';
import { useAppSelector } from '@store/hooks';

const usePartialViewCheck = () => {
  const isViewport960 = useResponsiveViewport(960);
  const { reviews } = useAppSelector((state) => state.game);

  const [isPartialView, setIsPartialView] = useState<boolean>(false);

  useEffect(() => {
    if (reviews.length > 0) {
      const firstReviewContentLines = reviews[0].content
        .split(/<br\s*\/?>/)
        .filter((line) => line.trim() !== '');

      const isPartial = firstReviewContentLines.length >= (isViewport960 ? 6 : 12);
      setIsPartialView(isPartial);
    }
  }, [reviews, isViewport960]);

  return { isPartialView, setIsPartialView };
};

export default usePartialViewCheck;

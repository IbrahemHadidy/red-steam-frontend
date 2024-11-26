import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Cleans up the image element when the component unmounts.
 * @param imageRef - Reference to the image element.
 */
const useImageCleanup = (imageRef: RefObject<HTMLImageElement | null>) => {
  useEffect(() => {
    const imageElement = imageRef.current;

    return () => {
      if (imageElement) {
        imageElement.src = '';
      }
    };
  }, [imageRef]);
};

export default useImageCleanup;

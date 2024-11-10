import { RefObject, useEffect, useState } from 'react';

/**
 * Custom hook to check if an element has entered the viewport for the first time
 * @param ref The ref object of the element to check
 * @param threshold The threshold for the intersection observer
 * @param rootMargin The root margin for the intersection observer
 */
export default function useFirstViewportEntry(
  ref: RefObject<HTMLDivElement | null>,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
  shouldLoad: boolean
): boolean {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hasEntered || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasEntered, ref, threshold, rootMargin, shouldLoad]);

  return hasEntered;
}

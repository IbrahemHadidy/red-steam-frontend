'use client';

import useFirstViewportEntry from '@hooks/useFirstViewportEntry';
import { Suspense, useEffect, useRef, useState } from 'react';

import Loader from './Loader';

import type { HTMLAttributes, ReactNode } from 'react';

interface RenderOnViewportEntryProps {
  children: ReactNode;
  loader?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  shouldLoad?: boolean;
  onLoadComplete?: () => void;
}

export default function RenderOnViewportEntry({
  children,
  loader,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
  wrapperProps,
  shouldLoad = true,
  onLoadComplete,
}: RenderOnViewportEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFirstViewportEntry(ref, threshold, rootMargin, shouldLoad);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isInView && shouldLoad && !loaded) {
      setLoaded(true);
      onLoadComplete?.();
    }
  }, [isInView, shouldLoad, loaded, onLoadComplete]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <div {...wrapperProps} ref={ref}>
      {loaded ? (
        <Suspense fallback={loader ?? <Loader />}>{children}</Suspense>
      ) : (
        (loader ?? <Loader />)
      )}
    </div>
  );
}

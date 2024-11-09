'use client';

import { Suspense, useRef } from 'react';

import useFirstViewportEntry from '@hooks/useFirstViewportEntry';

import Loader from './Loader';

import type { HTMLAttributes, ReactNode } from 'react';

interface RenderOnViewportEntryProps {
  children: ReactNode;
  loader?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export default function RenderOnViewportEntry({
  children,
  loader,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
  wrapperProps,
}: RenderOnViewportEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFirstViewportEntry(ref, threshold, rootMargin);

  return (
    <div {...wrapperProps} ref={ref}>
      {isInView ? (
        <Suspense fallback={loader ?? <Loader />}>{children}</Suspense>
      ) : (
        (loader ?? <Loader />)
      )}
    </div>
  );
}

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface ReviewsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Reviews admin - Red Steam',
  description: 'Manage reviews on Red Steam',
};

export default function ReviewsLayout({ children }: ReviewsLayoutProps): JSX.Element {
  return <>{children}</>;
}

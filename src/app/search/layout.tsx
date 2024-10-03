// Styles
import '@styles/search/Search.scss';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface SearchLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Red Steam Search',
  description: 'Search through Red Steam games and discover the best games.',
};

export default function SearchLayout({ children }: SearchLayoutProps): JSX.Element {
  return <>{children}</>;
}

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface TagsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Tag Admin - Red Steam',
  description: 'Create and manage tags on Red Steam.',
};

export default function TagsLayout({ children }: TagsLayoutProps): JSX.Element {
  return <>{children}</>;
}

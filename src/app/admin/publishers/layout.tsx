// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface PublishersLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Publisher Admin - Red Steam',
  description: 'Create and manage publishers on Red Steam.',
};

export default function PublishersLayout({ children }: PublishersLayoutProps): JSX.Element {
  return <>{children}</>;
}

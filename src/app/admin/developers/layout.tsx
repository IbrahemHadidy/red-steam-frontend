// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface DevelopersLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Developer Admin - Red Steam',
  description: 'Create and manage developers on Red Steam.',
};

export default function DevelopersLayout({ children }: DevelopersLayoutProps): JSX.Element {
  return <>{children}</>;
}

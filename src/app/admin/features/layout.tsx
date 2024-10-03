// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface FeaturesLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Feature Admin - Red Steam',
  description: 'Create and manage features on Red Steam.',
};

export default function FeaturesLayout({ children }: FeaturesLayoutProps): JSX.Element {
  return <>{children}</>;
}

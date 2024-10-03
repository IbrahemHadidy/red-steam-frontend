// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface LanguagesLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Language Admin - Red Steam',
  description: 'Create and manage languages on Red Steam.',
};

export default function LanguagesLayout({ children }: LanguagesLayoutProps): JSX.Element {
  return <>{children}</>;
}

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface OffersLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Offers admin - Red Steam',
  description: 'Manage game offers on Red Steam',
};

export default function OffersLayout({ children }: OffersLayoutProps): JSX.Element {
  return <>{children}</>;
}

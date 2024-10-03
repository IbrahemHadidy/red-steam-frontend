// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface UsersLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Users admin - Red Steam',
  description: 'Manage users on Red Steam',
};

export default function UsersLayout({ children }: UsersLayoutProps): JSX.Element {
  return <>{children}</>;
}

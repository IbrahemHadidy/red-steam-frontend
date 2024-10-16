import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to Red Steam',
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>;
}

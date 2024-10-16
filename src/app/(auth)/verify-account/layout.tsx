// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface VerifyAccountLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Verify Account',
  description: 'Verifying your account...',
};

export default function VerifyAccountLayout({ children }: VerifyAccountLayoutProps) {
  return <>{children}</>;
}

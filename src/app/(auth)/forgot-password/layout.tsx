import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface ForgotPasswordLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Name / Password Recovery',
  description: 'Recover your account name and password',
};

export default function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return <>{children}</>;
}

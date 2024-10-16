import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface ResetPasswordLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Password Reset',
  description: 'Reset your account password',
};

export default function ResetPasswordLayout({ children }: ResetPasswordLayoutProps) {
  return <>{children}</>;
}

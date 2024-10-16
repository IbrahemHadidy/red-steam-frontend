// Styles
import '@styles/auth/SignInUp.scss';

import type { ReactNode } from 'react';
interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}

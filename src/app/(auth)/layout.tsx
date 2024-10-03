// Styles
import '@styles/auth/SignInUp.scss';

import type { JSX, ReactNode } from 'react';
interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return <>{children}</>;
}

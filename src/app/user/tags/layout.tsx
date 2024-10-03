// Styles
import '@styles/user/Tags.scss';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: `Tags Selection`,
  description: `Select your favorite tags.`,
};

export default function LoginLayout({ children }: LoginLayoutProps): JSX.Element {
  return <>{children}</>;
}

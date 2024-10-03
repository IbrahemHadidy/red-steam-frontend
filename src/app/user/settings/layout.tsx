// Styles
import '@styles/user/Settings.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface SettingsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'User Settings',
  description: 'Manage your account settings and preferences.',
};

export default function SettingsLayout({ children }: SettingsLayoutProps): JSX.Element {
  return <>{children}</>;
}

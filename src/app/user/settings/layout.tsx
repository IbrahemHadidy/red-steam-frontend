// Styles
import '@styles/user/Settings.scss';

// Types
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'User Settings',
  description: 'Manage your account settings and preferences.',
};

const SettingsLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default SettingsLayout;

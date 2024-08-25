// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Users admin - Red Steam',
  description: 'Manage users on Red Steam',
};

const UsersLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default UsersLayout;

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Developer Admin - Red Steam',
  description: 'Create and manage developers on Red Steam.',
};

const DevelopersLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default DevelopersLayout;

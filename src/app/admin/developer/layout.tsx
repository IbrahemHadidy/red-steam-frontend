// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Developer Create - Red Steam',
  description: 'Create a new developer on Red Steam',
};

const DeveloperLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default DeveloperLayout;

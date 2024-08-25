// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Publisher Admin - Red Steam',
  description: 'Create and manage publishers on Red Steam.',
};

const PublishersLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default PublishersLayout;

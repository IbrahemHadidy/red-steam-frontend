// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Publisher Create - Red Steam',
  description: 'Create a new publisher on Red Steam',
};

const PublisherLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default PublisherLayout;

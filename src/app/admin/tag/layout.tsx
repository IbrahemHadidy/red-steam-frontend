// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Tag Create - Red Steam',
  description: 'Create a new game tag on Red Steam',
};

const TagLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default TagLayout;

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Tag Admin - Red Steam',
  description: 'Create and manage tags on Red Steam.',
};

const TagsLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default TagsLayout;

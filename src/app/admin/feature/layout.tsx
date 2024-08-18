// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Feature Create - Red Steam',
  description: 'Create a new game feature on Red Steam',
};

const FeatureLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default FeatureLayout;

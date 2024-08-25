// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Feature Admin - Red Steam',
  description: 'Create and manage features on Red Steam.',
};

const FeaturesLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default FeaturesLayout;

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Language Admin - Red Steam',
  description: 'Create and manage languages on Red Steam.',
};

const LanguagesLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default LanguagesLayout;

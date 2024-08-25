// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Offers admin - Red Steam',
  description: 'Manage game offers on Red Steam',
};

const OffersLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default OffersLayout;

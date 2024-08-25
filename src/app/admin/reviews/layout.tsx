// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Reviews admin - Red Steam',
  description: 'Manage reviews on Red Steam',
};

const ReviewsLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;

export default ReviewsLayout;

// Styles
import '@styles/shop/Checkout.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Purchase games',
};

const CheckoutLayout: FC<Props> = ({ children }): JSX.Element => <> {children}</>;
export default CheckoutLayout;

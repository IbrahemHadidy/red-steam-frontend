import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Name / Password Recovery',
  description: 'Recover your account name and password',
};

const ForgotPasswordLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default ForgotPasswordLayout;

import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Password Reset',
  description: 'Reset your account password',
};

const ResetPasswordLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default ResetPasswordLayout;

import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to Red Steam',
};

const LoginLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default LoginLayout;

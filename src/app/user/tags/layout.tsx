// Styles
import 'styles/user/Tags.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: `Tags Selection`,
  description: `Select your favorite tags.`,
};

const LoginLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default LoginLayout;

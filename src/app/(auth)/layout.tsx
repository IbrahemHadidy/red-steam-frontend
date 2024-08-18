// Styles
import 'styles/auth/SignInUp.scss';

import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default AuthLayout;

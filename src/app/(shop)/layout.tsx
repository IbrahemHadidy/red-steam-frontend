// Components
import RedirectIfNotLoggedIn from '@components/RedirectIfNotLoggedIn';

// Types
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const ShopLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <RedirectIfNotLoggedIn />
      {children}
    </>
  );
};

export default ShopLayout;

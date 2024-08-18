// Styles
import 'styles/search/Search.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Red Steam Search',
  description: 'Search through Red Steam games and discover the best games.',
};

const SearchLayout: FC<Props> = ({ children }): JSX.Element => <>{children}</>;
export default SearchLayout;

import dynamic from 'next/dynamic';

const Search = dynamic(() => import('pages/Search/Search'), { ssr: false });

const SearchPage = () => {
  return <Search />;
};

export default SearchPage;

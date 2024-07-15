import dynamic from 'next/dynamic';

const Store = dynamic(() => import('pages/Store/Store'), { ssr: false });

const StorePage = () => {
  return <Store />;
};

export default StorePage;

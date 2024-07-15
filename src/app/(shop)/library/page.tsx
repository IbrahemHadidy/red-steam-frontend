'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Library = dynamic(() => import('pages/Shop/Library/Library'), { ssr: false });

const LibraryPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <Library /> : null;
};

export default LibraryPage;

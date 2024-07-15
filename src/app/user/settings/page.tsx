'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Settings = dynamic(() => import('pages/User/Settings'), { ssr: false });

const SettingsPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <Settings /> : null;
};

export default SettingsPage;

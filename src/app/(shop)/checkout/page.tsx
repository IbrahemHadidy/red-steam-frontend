'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Checkout = dynamic(() => import('pages/Shop/Checkout/Checkout'), { ssr: false });

const CheckoutPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <Checkout /> : null;
};

export default CheckoutPage;

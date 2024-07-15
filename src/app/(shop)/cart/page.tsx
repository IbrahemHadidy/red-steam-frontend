'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Cart = dynamic(() => import('pages/Shop/Cart/Cart'), { ssr: false });

const CartPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <Cart /> : null;
};

export default CartPage;

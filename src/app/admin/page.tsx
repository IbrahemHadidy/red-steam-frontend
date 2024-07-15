import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Admin = dynamic(() => import('pages/Admin/Admin'), { ssr: false });

const AdminPage = () => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/auth/login');
    } else if (!userData?.isAdmin) {
      toast.warn('You are not authorized to access this page!');
      router.push('/');
    }
  }, [isLoggedIn, userData, router]);

  if (!isLoggedIn || !userData?.isAdmin) return null;

  return <Admin />;
};

export default AdminPage;

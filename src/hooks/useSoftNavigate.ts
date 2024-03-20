import { useCallback, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function useSoftNavigate() {
  const navigate = useNavigate();

  const navigateWithScroll = useCallback(
    (link: string, e?: MouseEvent | undefined) => {
      e && e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(link);
    },
    [navigate],
  );

  return navigateWithScroll;
}

export default useSoftNavigate;

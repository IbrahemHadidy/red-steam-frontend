import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook that replaces the current URL with a specified URL.
 * @param url - The URL to navigate to.
 */
export default function useReplaceUrl(url: string) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url, { scroll: false });
  }, [url, router]);
}

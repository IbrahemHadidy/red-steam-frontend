'use client';
import { useEffect } from 'react';

/**
 * Custom hook to set dynamic background
 * @param background The background css
 * @param dependencyArray Optional dependency array
 */
export default function useDynamicBackground(
  background: string,
  dependencyArray?: unknown[]
): void {
  useEffect(() => {
    document.body.style.background = background;

    return () => {
      document.body.style.background = '';
    };
  }, [background, dependencyArray]);
}

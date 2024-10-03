'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Styles
import '@styles/error.scss';

// Types
import type { Metadata } from 'next';
import type { JSX } from 'react';
interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export const metadata: Metadata = {
  title: 'Oops! Something went wrong.',
  description: 'Please refresh the page or try again later.',
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="error-boundary">
      <h1>Oops! Something went wrong.</h1>
      <p className="error-message">
        {error.name}:&nbsp;
        {error.message}
      </p>
      <p>Please refresh the page or try again later.</p>
      <button onClick={() => reset()}>Refresh</button>
      <button onClick={() => router.push('/')}>Back to store</button>
    </div>
  );
}

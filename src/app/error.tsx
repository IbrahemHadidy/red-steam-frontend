'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import './error.scss';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
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

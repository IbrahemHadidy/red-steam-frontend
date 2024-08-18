'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Styles
import 'styles/error.scss';

// Types
import type { FC, JSX } from 'react';
interface Props {
  error: Error;
  reset: () => void;
}

const ErrorBoundary: FC<Props> = ({ error, reset }): JSX.Element => {
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
};

export default ErrorBoundary;

import { useState, useEffect, ReactNode, FC } from 'react';
import './ErrorBoundary.scss';

const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      console.error('Unhandled Promise Rejection:', event.error);
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener('error', handleWindowError);

    return () => {
      window.removeEventListener('error', handleWindowError);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="error-boundary">
        <h1>Oops! Something went wrong.</h1>
        {error && (
          <p className="error-message">
            {error.name}:&nbsp;
            {error.message}
          </p>
        )}
        <p>Please refresh the page or try again later.</p>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;

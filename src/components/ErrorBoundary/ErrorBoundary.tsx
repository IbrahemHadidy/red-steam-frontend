import { useState, useEffect, ReactNode, FC, useRef } from 'react';
import './ErrorBoundary.scss';

const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const errorRef = useRef<Error | null>(null);

  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      console.error('Unhandled Promise Rejection:', event.error);
      errorRef.current = event.error;
      setHasError(true);
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
        {errorRef.current && (
          <p className="error-message">
            {errorRef.current.name}:&nbsp;
            {errorRef.current.message}
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

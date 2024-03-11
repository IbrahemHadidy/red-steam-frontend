import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Toaster from 'components/Toaster/Toaster';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.scss';
import { AuthProvider } from 'contexts/AuthContext';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    // <StrictMode>
      <ErrorBoundary>
        <Toaster />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>,
    // </StrictMode>
  );
}

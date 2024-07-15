import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Toaster from 'components/Toaster/Toaster';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <Toaster />
        <Router />
      </ErrorBoundary>
    </StrictMode>,
  );
}

'use client';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';

// Images
import glitchImage from '@images/glitch-image.png';

// Styles
import '@styles/not-found.scss';

// Types
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for could not be found. It seems like you have wandered into uncharted territory.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'Oops! The page you are looking for could not be found.',
    url: '/notfound',
    type: 'website',
    images: [
      {
        url: glitchImage.src,
        alt: 'Page Not Found',
      },
    ],
  },
};

export default function NotFound(): JSX.Element {
  return (
    <>
      <Header />
      <div className="not-found">
        <img src={glitchImage.src} alt="Page Not Found" className="not-found-image" />
        <div className="not-found-content">
          <h1 className="not-found-heading" data-text="404">
            404
          </h1>
          <p className="not-found-text" data-text="Oops! Page Not Found">
            Oops! Page Not Found
          </p>
          <p className="not-found-text" data-text="The page you're looking for could not be found.">
            The page you're looking for could not be found.
          </p>
          <p
            className="not-found-text"
            data-text="It seems like you've wandered into uncharted territory."
          >
            It seems like you've wandered into uncharted territory.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

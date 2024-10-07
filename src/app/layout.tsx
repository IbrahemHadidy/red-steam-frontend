// Providers
import AuthProvider from '@providers/AuthProvider';
import StoreProvider from '@providers/StoreProvider';

// Toast notifications
import Toaster from '@components/Toaster/Toaster';

// Images
import favIcon from '@images/favicon.ico';

// Styles
import '@styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH || ''),
  icons: {
    icon: favIcon.src,
  },
  title: 'Welcome to Red Steam',
  description: 'Red Steam - Clone of Steam',
  openGraph: {
    title: 'Red Steam',
    description: 'Red Steam - Clone of Steam',
    url: '',
    siteName: 'Red Steam',
    images: '@images/pwa-icon.png',
  },
  twitter: {
    site: 'Red Steam',
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <StoreProvider>
            <AuthProvider>
              <Toaster />
              {children}
            </AuthProvider>
          </StoreProvider>
        </div>
        <div id="loading-portal" />
      </body>
    </html>
  );
}

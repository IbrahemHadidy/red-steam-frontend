// Toast notifications
import Toaster from '@components/Toaster/Toaster';

// Providers
import AuthProvider from '@providers/AuthProvider';
import ReduxStoreProvider from '@providers/ReduxStoreProvider';

// Images
import favIcon from '@images/favicon.ico';

// Styles
import '@styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH ?? ''),
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload stylesheet"
          href="https://fonts.cdnfonts.com/css/motiva-sans"
          as="style"
        />
        <link rel="preload stylesheet" href="https://fonts.cdnfonts.com/css/arial" as="style" />
        <link
          rel="preload stylesheet"
          href="https://fonts.cdnfonts.com/css/microsoft-sans-serif"
          as="style"
        />
      </head>

      <body>
        <div id="root">
          <ReduxStoreProvider>
            <AuthProvider>
              <Toaster />
              {children}
            </AuthProvider>
          </ReduxStoreProvider>
        </div>
        <div id="loading-portal" />
      </body>
    </html>
  );
}

// React
import { AuthProvider } from '@contexts/AuthContext';

// Toast notifications
import Toaster from '@components/Toaster/Toaster';

// Images
import favIcon from '@images/favicon.ico';

// Styles
import '@styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH || ''),
  icons: {
    icon: favIcon.src,
  },
  title: 'Welcome to Red Steam',
  description: 'Red Steam - Clone of Steam',
  appleWebApp: {
    title: 'Red Steam',
    capable: true,
  },
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

const RootLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0b141b' }}>
        <div id="root">
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

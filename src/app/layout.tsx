import Toaster from 'components/Toaster/Toaster';
import { AuthProvider } from 'contexts/AuthContext';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './globals.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  icons: {
    icon: 'images/favicon.ico',
  },
  title: 'Welcome to Red Steam',
  description: 'Red Steam - Clone of Steam',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body style={{ backgroundColor: '#0b141b' }}>
          <div id="root">
            <Toaster />
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}

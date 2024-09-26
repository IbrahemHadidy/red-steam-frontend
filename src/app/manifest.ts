import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Red Steam',
  short_name: 'Red Steam',
  description: 'Red Steam - Game Store',
  start_url: '/',
  display: 'standalone',
  background_color: '#1b2838',
  theme_color: '#171d25',
  icons: [
    {
      src: 'images/pwa-icon.png',
      sizes: '240x240',
      type: 'image/png',
    },
  ],
});

export default manifest;

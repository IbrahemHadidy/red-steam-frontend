import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.dropbox.com' }],
  },
  sassOptions: {
    includePaths: [path.resolve('src/styles')],
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;

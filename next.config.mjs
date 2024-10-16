import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.dropbox.com' }],
  },
  sassOptions: {
    includePaths: [path.resolve('src/styles')],
  },
};

export default nextConfig;

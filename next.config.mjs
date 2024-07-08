import { withNextVideo } from 'next-video/process';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'd15f34w2p8l1cc.cloudfront.net',
      'images.blz-contentstack.com',
      'blz-contentstack-images.akamaized.net',
    ],
  },
};

const nextPWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const withPWAConfig = withPWA(nextPWAConfig);

export default withNextVideo ( 
  withPWAConfig({
    ...nextConfig
  })
)
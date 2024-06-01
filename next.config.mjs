import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'd15f34w2p8l1cc.cloudfront.net',
      'images.blz-contentstack.com',
      'blz-contentstack-images.akamaized.net',
    ]
  }
};

export default withNextVideo(nextConfig);
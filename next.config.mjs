import { withNextVideo } from "next-video/process";
const shouldAnalyzeBundles = process.env.ANALYZE === true;
/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
};

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require('next-bundle-analyzer')(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

export default withNextVideo(nextConfig);
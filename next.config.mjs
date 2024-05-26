import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
};

export default withNextVideo(nextConfig);
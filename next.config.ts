import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'huce.edu.vn',
      },
      {
        protocol: 'https',
        hostname: 'www.huce.edu.vn',
      },
    ],
  },
};

export default nextConfig;

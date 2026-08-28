import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-malshan.vercel.app',
      },
    ],
  },
};

export default nextConfig;

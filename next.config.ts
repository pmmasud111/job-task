import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [],
  experimental: {
    after: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

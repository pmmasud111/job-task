import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [],
  experimental: {
    after: true,
  },
};

export default nextConfig;

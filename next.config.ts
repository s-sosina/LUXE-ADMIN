import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure proper static generation
  trailingSlash: false,
} as NextConfig;

export default nextConfig;
